import { configDotenv } from 'dotenv';
import 'dotenv/config'; // ใช้ bcryptjs แทน bcrypt

export default async function isValidPassword(password: string, hashedPassword: string): Promise<boolean> {
  return configDotenv.compare(password, hashedPassword);
}
