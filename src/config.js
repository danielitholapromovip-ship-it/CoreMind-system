require('dotenv').config();
const path = require('path');

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  prefix: process.env.PREFIX || '!',
  ownerNumber: process.env.OWNER_NUMBER || '',
  adapters: {
    whatsapp: (process.env.ENABLE_WHATSAPP || 'true') === 'true',
    telegram: (process.env.ENABLE_TELEGRAM || 'true') === 'true',
    discord: (process.env.ENABLE_DISCORD || 'true') === 'true',
    web: (process.env.ENABLE_WEB || 'true') === 'true'
  },
  whatsapp: {
    sessionPath: path.resolve(process.env.WHATSAPP_SESSION_PATH || './sessions/whatsapp')
  },
  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN || ''
  },
  discord: {
    token: process.env.DISCORD_BOT_TOKEN || ''
  }
};
