const { default: makeWASocket, useSingleFileAuthState, fetchLatestBaileysVersion } = require('@adiwajshing/baileys');
const qrcode = require('qrcode-terminal');
const path = require('path');
const fs = require('fs');
const handler = require('../handler');
const { Boom } = require('@hapi/boom');

function init({ config, plugins }) {
  const sessionPath = config.whatsapp.sessionPath;
  if (!fs.existsSync(path.dirname(sessionPath))) fs.mkdirSync(path.dirname(sessionPath), { recursive: true });
  const authFile = path.join(sessionPath, 'auth_info.json');
  const { state, saveState } = useSingleFileAuthState(authFile);

  (async () => {
    const { version } = await fetchLatestBaileysVersion();
    const sock = makeWASocket({
      version,
      auth: state,
      printQRInTerminal: false
    });

    sock.ev.on('connection.update', (update) => {
      const { connection, qr, lastDisconnect } = update;
      if (qr) qrcode.generate(qr, { small: true });
      if (connection === 'open') {
        console.log('WhatsApp: conectado como', sock.user?.id || sock.user?.name);
      }
      if (connection === 'close') {
        const shouldReconnect = !(lastDisconnect?.error && lastDisconnect.error.output?.statusCode === 401);
        console.log('WhatsApp: desconectado. Reconectar?', shouldReconnect);
        if (shouldReconnect) init({ config, plugins });
      }
    });

    sock.ev.on('creds.update', saveState);

    sock.ev.on('messages.upsert', async (m) => {
      try {
        const msg = m.messages[0];
        if (!msg || msg.key.fromMe) return;
        const messageText = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
        if (!messageText.startsWith(config.prefix)) return;

        const parts = messageText.slice(config.prefix.length).trim().split(/ +/);
        const cmd = parts.shift().toLowerCase();
        const send = async (payload, context) => {
          // payload: { text: '...' }
          await sock.sendMessage(context.key.remoteJid, { text: payload.text }, { quoted: context });
        };
        await handler.handleCommand({ plugins, command: cmd, args: parts, send, context: msg });
      } catch (e) {
        console.error('Error procesando mensaje WA:', e);
      }
    });

  })().catch(err => console.error('Error iniciando WhatsApp adapter', err));
}

module.exports = { init };
