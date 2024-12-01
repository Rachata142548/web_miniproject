import { prisma } from "@/utils/prisma";

async function main() {
  await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: "password123",
    },
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });