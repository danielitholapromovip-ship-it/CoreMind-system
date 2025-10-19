const config = require('./config');

async function handleCommand({ plugins, command, args, send, context }) {
  // buscar plugin por comando
  for (const name in plugins) {
    const p = plugins[name];
    if (p.commands && p.commands.includes(command)) {
      try {
        await p.exec({ send, context, args });
      } catch (e) {
        console.error('Error en plugin', name, e);
        await send({ text: 'Error interno del plugin.' }, context);
      }
      return;
    }
  }
  // si no encontró
  await send({ text: `Comando no encontrado: ${config.prefix}${command}` }, context);
}

module.exports = { handleCommand };
