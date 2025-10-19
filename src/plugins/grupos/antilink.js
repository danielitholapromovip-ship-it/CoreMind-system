module.exports = {
  name: 'antilink',
  description: 'Evita que envíen links en el grupo',
  commands: ['antilink'],
  group: true,
  admin: true,
  exec: async ({ send, context, args, group }) => {
    const opt = args[0];
    if (opt === 'on') group.settings.antilink = true;
    else if (opt === 'off') group.settings.antilink = false;
    else return await send({ text: '⚙️ Usa !antilink on/off' }, context);
    await send({ text: `🔗 Antilink ${group.settings.antilink ? 'activado' : 'desactivado'}` }, context);
  }
};
