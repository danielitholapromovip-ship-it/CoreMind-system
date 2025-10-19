const fs = require('fs');
const path = require('path');

function loadAll(dir) {
  const plugins = {};
  const files = fs.readdirSync(path.resolve(dir)).filter(f => f.endsWith('.js'));
  for (const file of files) {
    try {
      const p = require(path.resolve(dir, file));
      if (p.name) plugins[p.name] = p;
      else plugins[file.replace('.js','')] = p;
      console.log('🔌 Plugin cargado:', file);
    } catch (e) {
      console.error('Error cargando plugin', file, e.message);
    }
  }
  return plugins;
}

module.exports = { loadAll };
