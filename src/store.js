const users = [];

export function findUserByEmail(email) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export function findUserById(id) {
  return users.find((u) => u.id === id) ?? null;
}

export function createUser(user) {
  users.push(user);
  return user;
}

export function publicUser(user) {
  const { passwordHash: _passwordHash, ...rest } = user;
  return rest;
}

