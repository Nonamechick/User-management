// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });
    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    if (err.code === "P2002") {
      res.status(400).json({ message: "Email already in use" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  if (user.status === "blocked")
    return res.status(403).json({ message: "Account is blocked" });

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token });
};
