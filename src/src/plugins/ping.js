module.exports = {
  name: 'ping',
  description: 'Responde Pong (prueba)',
  exec: async ({ send, context, args }) => {
    await send({ text: 'Pong! 🟢 CoreMind System' }, context);
  },
  commands: ['ping']
};
