const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async function user(req, res) {
  const { username } = req.query;

  if (req.method == "GET") {
    res.status(200).json({
      data: await prisma.users.findFirst({ where: { username: username } }),
    });
  } else if (req.method == "PUT") {
    await prisma.users.update({
      where: { username: username },
      data: {
        scores: {
          create: [
            {
              score: req.body.score,
            },
          ],
        },
      },
    });
    res.status(200).json({
      data: {
        username: req.query.username,
        score: req.body.score,
      },
    });
  }
}
