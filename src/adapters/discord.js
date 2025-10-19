const { Client, GatewayIntentBits } = require('discord.js');
const handler = require('../handler');

function init({ config, plugins }) {
  const token = config.discord.token;
  if (!token) throw new Error('DISCORD_BOT_TOKEN no configurado');
  const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

  client.on('ready', () => console.log(`Discord: Conectado como ${client.user.tag}`));
  client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
    const content = msg.content || '';
    if (!content.startsWith(config.prefix)) return;
    const parts = content.slice(config.prefix.length).trim().split(/ +/);
    const cmd = parts.shift().toLowerCase();
    const send = async (message, context) => {
      if (message.text) await msg.channel.send(message.text);
    };
    await handler.handleCommand({ plugins, command: cmd, args: parts, send, context: msg });
  });

  client.login(token);
}

module.exports = { init };
