import { scrypt, randomBytes, BinaryLike } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify<BinaryLike, BinaryLike, number, Buffer>(scrypt);

export class Hash {
  static async toHash (value: string, salt?: string) {
    salt = salt ?? randomBytes(8).toString('hex');
    const buffer = await scryptAsync(value, salt, 64);
    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compare (value: string, valueHash: string) {
    const [_, salt] = valueHash.split('.');
    return await this.toHash(value, salt) === valueHash;
  }
}