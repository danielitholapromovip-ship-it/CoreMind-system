const config = require('./config');
const pluginLoader = require('./utils/pluginLoader');
const express = require('express');

(async () => {
  console.log('🚀 Iniciando CoreMind System Bot —', config.env);

  // Cargar plugins
  const plugins = pluginLoader.loadAll('./src/plugins');

  // Inicializar adaptadores según config
  if (config.adapters.whatsapp) {
    try {
      const wa = require('./adapters/whatsapp');
      wa.init({ config, plugins });
      console.log('🔗 WhatsApp adapter iniciado');
    } catch (e) {
      console.error('⚠️ Error iniciando WhatsApp adapter:', e.message);
    }
  }

  if (config.adapters.telegram) {
    try {
      const tg = require('./adapters/telegram');
      tg.init({ config, plugins });
      console.log('🔗 Telegram adapter iniciado');
    } catch (e) {
      console.error('⚠️ Error iniciando Telegram adapter:', e.message);
    }
  }

  if (config.adapters.discord) {
    try {
      const dc = require('./adapters/discord');
      dc.init({ config, plugins });
      console.log('🔗 Discord adapter iniciado');
    } catch (e) {
      console.error('⚠️ Error iniciando Discord adapter:', e.message);
    }
  }

  // Start web server (simple health + UI hook)
  if (config.adapters.web) {
    const app = express();
    app.get('/', (req, res) => res.sendFile(require('path').resolve(__dirname, 'branding', 'banner.txt')));
    app.get('/health', (req, res) => res.json({ status: 'ok', name: 'CoreMind System Bot' }));
    app.listen(config.port, () => console.log(`🌐 Web server escuchando en http://localhost:${config.port}`));
  }
})();

