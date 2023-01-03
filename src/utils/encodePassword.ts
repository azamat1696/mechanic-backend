/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';
// import bcrypt from 'bcryptjs';

export function encodePassword(password: string) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

export function comparePasswords(rawPassword: string, hash: string) {
  return bcrypt.compareSync(rawPassword, hash);
}
