import { getUserWithUsername, updateUser } from "@/controllers/user.controller";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async function user(req, res) {
  const { username } = req.query;

  if (req.method == "GET") {
    res.status(200).json(await getUserWithUsername(username));
  } else if (req.method == "PUT") {
    const updateResult = await updateUser(username, req.body.score);
    res.status(200).json({
      data: {
        username: req.query.username,
        score: req.body.score,
      },
    });
  }
}
