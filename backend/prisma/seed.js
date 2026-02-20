const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');
  
  // Use env variable or fallback for security
  const adminPassword = process.env.ADMIN_PASSWORD || 'password123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password: hashedPassword,
    },
  });

  console.log('✅ Seeded user:', user.email);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('🚀 Seeding finished successfully.');
    process.exit(0); // This tells Vercel the build step is DONE
  })
  .catch(async (e) => {
    console.error('❌ Seeding error:', e);
    await prisma.$disconnect();
    process.exit(1); // Exit with error code if it fails
  });