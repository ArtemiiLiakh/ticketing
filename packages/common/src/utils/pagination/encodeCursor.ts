export const encodeCursor = (cursor: object): string => {
  return Buffer.from(JSON.stringify(cursor)).toString('base64url');
}