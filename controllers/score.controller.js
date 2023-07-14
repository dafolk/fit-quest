const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export const getSortedScoreByDesc = async () => {
  return await prisma.scores.findMany({
    select: {
      id: true,
      score: true,
      users: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      score: "desc",
    },
  });
};
