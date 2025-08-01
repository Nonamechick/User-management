const request = require("supertest");
const app = require("../src/index"); // Adjust path if needed
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let token;
let userId;

beforeAll(async () => {
  // Create a user and generate token
  await prisma.user.deleteMany(); // Clean slate

  const user = await prisma.user.create({
    data: {
      name: "Test Admin",
      email: "admin@example.com",
      password: "hashedpassword", // Use actual hash if needed
      status: "active",
      role: "admin", // Assume this makes the user authorized
    },
  });

  userId = user.id;

  // Simulate login (if your app uses JWT)
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "admin@example.com",
      password: "password", // Match with actual password logic
    });

  token = res.body.token;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("User Management", () => {
  test("should block the user", async () => {
    const res = await request(app)
      .put("/api/users/status")
      .set("Authorization", `Bearer ${token}`)
      .send({ ids: [userId], status: "blocked" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain("blocked");

    const updatedUser = await prisma.user.findUnique({ where: { id: userId } });
    expect(updatedUser.status).toBe("blocked");
  });

  test("should unblock the user", async () => {
    const res = await request(app)
      .put("/api/users/status")
      .set("Authorization", `Bearer ${token}`)
      .send({ ids: [userId], status: "active" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain("active");

    const updatedUser = await prisma.user.findUnique({ where: { id: userId } });
    expect(updatedUser.status).toBe("active");
  });

  test("should delete the user", async () => {
    const res = await request(app)
      .delete("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send({ ids: [userId] });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Users deleted");

    const deletedUser = await prisma.user.findUnique({ where: { id: userId } });
    expect(deletedUser).toBeNull();
  });
});
