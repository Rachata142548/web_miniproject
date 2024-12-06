// src/utils/prisma.ts
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // สำหรับ development, ใช้ PrismaClient ที่แชร์กัน
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// ฟังก์ชันสำหรับอัปเดต role ของผู้ใช้
export async function updateUserRole(email: string, role: string) {
  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role },
    });
    console.log(updatedUser);
  } catch (error) {
    console.error("Error updating user role:", error);
  }
}

export default prisma;