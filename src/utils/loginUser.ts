import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET; // ใช้ Secret Key จาก .env

export async function loginUser(email: string, password: string) {
  // คุณอาจเพิ่ม logic เพื่อตรวจสอบความถูกต้องของอีเมลและรหัสผ่านที่นี่
  const token = jwt.sign({ email }, secret!, { expiresIn: "1h" }); // ใช้ secret ในการเซ็นลายเซ็น
  return token;
}
