const db = require('../../utils/db');
module.exports = {
  name: 'profile',
  description: 'Muestra tu perfil',
  commands: ['profile', 'perfil'],
  exec: async ({ send, context }) => {
    const id = context.sender?.id;
    const user = db.getUser(id);
    if (!user) return await send({ text: '❗ No estás registrado. Usa !register' }, context);
    const text = `👤 *Perfil de ${user.name}*
━━━━━━━━━━━━━━━
🪪 ID: ${user.id}
💰 Coins: ${user.coins}
🏆 Nivel: ${user.level}
📅 Registrado: ${user.date}`;
    await send({ text }, context);
  }
};
