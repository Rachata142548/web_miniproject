// src/utils/jwt.ts
import jwt from 'jsonwebtoken';

// ฟังก์ชันในการสร้าง JWT Token
export const generateToken = (userId: number, role: string) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
};

// ฟังก์ชันในการตรวจสอบ JWT Token
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret');
  } catch (error) {
    return null; // หาก JWT ไม่ถูกต้องหรือหมดอายุจะคืนค่า null
  }
};

// ฟังก์ชันในการดึงข้อมูลจาก JWT Token
export const decodeToken = (token: string) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null; // หากมีข้อผิดพลาดในการ decode จะคืนค่า null
  }
};