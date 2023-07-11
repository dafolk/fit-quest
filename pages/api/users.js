import {
  createUser,
  getAllUsers,
  getUserWithUsername,
  getUsersWithScores,
} from "@/controllers/user.controller";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method == "POST") {
    await prisma.users.create({
      data: {
        username: req.body.username,
        scores: {
          create: [{ score: req.body.score }],
        },
      },
    });
    res.status(200).json({ data: { username: req.body.username } });
  } else if (req.method == "GET") {
    res.status(200).json({ data: await prisma.users.findMany() });
  }
  // try {
  //   const users = await prisma.users.findMany();
  //   res.status(200).json(users);
  // } catch (e) {
  //   console.error("Request error", e);
  //   res.status(500).json({ error: "Error fetching posts" });
  // }
}
