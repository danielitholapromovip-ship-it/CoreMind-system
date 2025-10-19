module.exports = {
  name: 'eval',
  description: 'Ejecuta código JS (solo dueño)',
  commands: ['eval', 'run'],
  private: true,
  owner: true,
  exec: async ({ send, context, args, isOwner }) => {
    if (!isOwner) return await send({ text: '❌ Solo el dueño puede usar este comando.' }, context);
    try {
      const result = eval(args.join(' '));
      await send({ text: '✅ Resultado:\n' + String(result) }, context);
    } catch (e) {
      await send({ text: '⚠️ Error:\n' + e.message }, context);
    }
  }
};
