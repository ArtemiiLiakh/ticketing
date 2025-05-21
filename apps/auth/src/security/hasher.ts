export interface Hasher {
  toHash (value: string, salt?: string): Promise<string>;
  compare (value: string, valueHash: string): Promise<boolean>;
}