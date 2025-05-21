import { Hasher } from '@security/hasher';
import { createHash, randomBytes } from 'crypto';

export class Sha256Hasher implements Hasher {
  async toHash (value: string, salt?: string): Promise<string> {
    const hash = createHash('sha256');

    salt = salt ?? randomBytes(8).toString('hex');
    
    const hashedValue = hash.update(value+salt).digest('base64');

    return `${hashedValue}.${salt}`;
  }

  async compare (value: string, valueHash: string): Promise<boolean> {
    const salt = valueHash.split('.')[1];
    return await this.toHash(value, salt) === valueHash;
  }
}