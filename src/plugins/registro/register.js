const db = require('../../utils/db');
module.exports = {
  name: 'register',
  description: 'Registra un nuevo usuario',
  commands: ['register', 'reg', 'registro'],
  exec: async ({ send, context, args }) => {
    const name = args.join(' ') || context.from?.first_name || 'Usuario';
    const id = context.sender?.id;
    const user = db.addUser({ id, name });
    await send({ text: `📝 ${name}, estás registrado con ID: ${user.id}` }, context);
  }
};
