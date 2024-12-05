import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // เข้ารหัสรหัสผ่าน
  const hashedPassword = await bcrypt.hash('admin_password', 10);

  // สร้างผู้ใช้ Admin พร้อมรหัสผ่านที่เข้ารหัส
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword, // ใช้รหัสผ่านที่เข้ารหัส
      role: 'Admin',  // กำหนดบทบาทเป็น Admin
    },
  });
  console.log('Admin user created: ', admin);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });