// tests/setup.js
require('dotenv').config({ path: '.env.test' });

const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();


beforeEach(async () => {
  // Avoid deleting all users — only delete users created for test (e.g. with specific email pattern)
  await prisma.user.deleteMany({
    where: {
      email: {
        contains: "test+"
      }
    }
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
