import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export const generateJWToken = (userID: string, options = {}) => sign({ userID }, process.env.APP_SECRET, options);
export const hashPassword = async (password: string) => await hash(password, 10);
export const comparePasswords = async (password: string, userPassword: string) => await compare(password, userPassword);
