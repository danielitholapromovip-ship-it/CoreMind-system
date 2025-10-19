module.exports = {
  name: 'restart',
  description: 'Reinicia el bot (solo dueño)',
  commands: ['restart', 'reboot'],
  private: true,
  owner: true,
  exec: async ({ send, context, isOwner }) => {
    if (!isOwner) return await send({ text: '🚫 Solo el dueño puede reiniciar el bot.' }, context);
    await send({ text: '♻️ Reiniciando CoreMind System...' }, context);
    process.exit(0);
  }
};
