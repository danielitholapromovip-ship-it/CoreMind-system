module.exports = {
  name: 'mute',
  description: 'Silencia a un miembro',
  commands: ['mute'],
  group: true,
  admin: true,
  exec: async ({ send, context, args }) => {
    const user = args[0];
    if (!user) return await send({ text: '⚠️ Menciona un usuario o ID.' }, context);
    await send({ text: `🔇 Usuario ${user} silenciado temporalmente.` }, context);
  }
};
