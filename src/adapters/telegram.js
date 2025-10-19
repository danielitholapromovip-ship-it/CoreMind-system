const { Telegraf } = require('telegraf');
const handler = require('../handler');

function simpleSender(bot) {
  return async (message, context) => {
    const chatId = context.chat?.id || context.from?.id;
    if (!chatId) return;
    if (message.text) await bot.telegram.sendMessage(chatId, message.text, { reply_to_message_id: context.message_id });
  };
}

function init({ config, plugins }) {
  const token = config.telegram.token;
  if (!token) throw new Error('TELEGRAM_BOT_TOKEN no configurado');
  const bot = new Telegraf(token);

  bot.start((ctx) => ctx.reply(`CoreMind System Bot activo. Prefix: ${config.prefix}`));
  bot.on('text', async (ctx) => {
    const text = ctx.message.text || '';
    if (!text.startsWith(config.prefix)) return;
    const parts = text.slice(config.prefix.length).trim().split(/ +/);
    const cmd = parts.shift().toLowerCase();
    const send = simpleSender(bot);
    await handler.handleCommand({ plugins, command: cmd, args: parts, send, context: ctx });
  });

  bot.launch();
  // graceful shutdown
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

module.exports = { init };
