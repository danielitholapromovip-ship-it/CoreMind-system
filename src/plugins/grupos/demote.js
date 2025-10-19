module.exports = {
  name: 'demote',
  description: 'Quita rango de admin',
  commands: ['demote', 'degradar'],
  group: true,
  admin: true,
  exec: async ({ send, context, args }) => {
    const user = args[0];
    await send({ text: `❌ ${user} ya no es administrador.` }, context);
  }
};
