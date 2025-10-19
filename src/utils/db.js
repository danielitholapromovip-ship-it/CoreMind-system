const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '../../database.json');
let db = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : { users: [], bans: [] };

function save() { fs.writeFileSync(file, JSON.stringify(db, null, 2)); }

exports.addUser = (user) => {
  if (!db.users.find(u => u.id === user.id)) {
    user.level = 1;
    user.coins = 100;
    user.date = new Date().toLocaleDateString();
    db.users.push(user);
    save();
  }
  return user;
};

exports.getUser = (id) => db.users.find(u => u.id === id);

exports.dailyReward = (id) => {
  const user = exports.getUser(id);
  if (!user) return '⚠️ No estás registrado.';
  user.coins += 50;
  save();
  return `💰 Has recibido 50 coins. Total: ${user.coins}`;
};

exports.banUser = (id) => {
  if (!db.bans.includes(id)) db.bans.push(id);
  save();
};

exports.isBanned = (id) => db.bans.includes(id);
