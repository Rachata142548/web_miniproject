import bcrypt from "bcryptjs";  // ใช้ bcryptjs แทน bcrypt

export default async function isValidPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
