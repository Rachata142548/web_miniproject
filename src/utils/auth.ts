import jwt from 'jsonwebtoken';

export const getUserRoleFromToken = (token: string) => {
  try {
    const decoded = jwt.decode(token); // ถอดรหัส JWT token
    return decoded ? decoded.role : null; // ดึง role ออกจาก token
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
