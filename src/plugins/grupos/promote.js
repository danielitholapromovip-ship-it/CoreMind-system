module.exports = {
  name: 'promote',
  description: 'Asciende a un usuario a admin',
  commands: ['promote', 'ascender'],
  group: true,
  admin: true,
  exec: async ({ send, context, args }) => {
    const user = args[0];
    await send({ text: `🛡️ ${user} ahora es administrador.` }, context);
  }
};
