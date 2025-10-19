const db = require('../../utils/db');
module.exports = {
  name: 'banuser',
  description: 'Banea a un usuario del bot',
  commands: ['ban', 'banuser'],
  private: true,
  owner: true,
  exec: async ({ send, context, args, isOwner }) => {
    if (!isOwner) return await send({ text: '🚫 Solo el dueño puede usar este comando.' }, context);
    const user = args[0];
    if (!user) return await send({ text: '⚠️ Especifique un usuario ID.' }, context);
    db.banUser(user);
    await send({ text: `✅ Usuario ${user} baneado.` }, context);
  }
};
