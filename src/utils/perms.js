module.exports = {
  isOwner: (id, owner) => id === owner,
  isAdmin: (user, group) => group.admins.includes(user),
  canUse: (cmd, user, group, owner) => {
    if (cmd.owner && user !== owner) return false;
    if (cmd.admin && !group.admins.includes(user)) return false;
    return true;
  }
};
