import * as crypto from 'crypto';

function generateRandomId(length: number = 10): string {
  const buffer = crypto.randomBytes(Math.ceil(length / 2));
  return buffer.toString('hex').slice(0, length);
}

export { generateRandomId };
