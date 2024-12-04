import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // ตัวอย่างข้อมูล seed
  const hashedPassword = await bcrypt.hash('password123', 10);
  await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: hashedPassword,
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
  