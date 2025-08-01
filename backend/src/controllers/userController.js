// controllers/userController.js
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

exports.getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { lastLogin: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      lastLogin: true,
      createdAt: true,
    },
  });
  res.json(users);
};

exports.updateStatus = async (req, res) => {
  const { ids, status } = req.body;
  await prisma.user.updateMany({
    where: { id: { in: ids } },
    data: { status },
  });
  res.json({ message: `Users ${status}` });
};

exports.deleteUsers = async (req, res) => {
  const { ids } = req.body;
  await prisma.user.deleteMany({ where: { id: { in: ids } } });
  res.json({ message: "Users deleted" });
};
