module.exports = {
  name: 'welcome',
  description: 'Activa o desactiva mensajes de bienvenida',
  commands: ['welcome', 'bienvenida'],
  group: true,
  admin: true,
  exec: async ({ send, context, args, group }) => {
    const option = args[0];
    if (option === 'on') group.settings.welcome = true;
    else if (option === 'off') group.settings.welcome = false;
    else return await send({ text: '⚙️ Usa !welcome on/off' }, context);
    await send({ text: `👋 Bienvenida ${group.settings.welcome ? 'activada' : 'desactivada'}` }, context);
  }
};
