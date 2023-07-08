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

const createUser = async (username) => {
  await prisma.users.create({
    data: {
      username: username,
    },
  });
};

const getUserIdWithUsername = async (username) => {
  return await prisma.users.findFirst({
    where: {
      username: username,
    },
  });
};

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
