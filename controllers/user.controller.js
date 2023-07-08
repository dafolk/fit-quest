const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUsersWithScores = async () => {
  return await prisma.users.findMany({
    orderBy: { scores: { _count: "desc" } },
    include: {
      scores: {
        select: {
          score: true,
        },
      },
    },
  });
};

const createUser = async (username, score) => {
  await prisma.users.create({
    data: {
      username: username,
      scores: {
        create: {
          score: score,
        },
      },
    },
  });
};

const getUserWithUsername = async () => {};

module.exports = { getUsersWithScores, createUser };

// const topPlayers = users
//   .map((user) => {
//     return { username: users.username, score: users.score };
//   })
//   .sort((first, second) => {
//     first.score < second.score ? 1 : first.score > second.score ? -1 : 0;
//   })
//   .slice(0, 5);

// const scores = await prisma.score.findMany({

// })

// const topScores =

// export default getUsersWithScores;
