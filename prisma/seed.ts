import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // ตัวอย่างข้อมูล seed
  const hashedPassword = await bcrypt.hash('12345678', 10);

  // สร้างผู้ใช้ Admin
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'Admin', // เพิ่มฟิลด์ role และตั้งค่าเป็น 'Admin'
    },
  });

  console.log('✅ Seed data has been inserted successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('❌ An error occurred while seeding:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
  