const db = require('../../utils/db');
module.exports = {
  name: 'daily',
  description: 'Reclama tu recompensa diaria',
  commands: ['daily', 'diario'],
  exec: async ({ send, context }) => {
    const id = context.sender?.id;
    const reward = db.dailyReward(id);
    await send({ text: reward }, context);
  }
};
