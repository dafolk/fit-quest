const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  return await prisma.users.findMany({
    include: {
      scores: {
        orderBy: {
          score: "desc",
        },
        select: {
          score: true,
        },
      },
    },
  });
};

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

export const createUser = async (username) => {
  await prisma.users.create({
    data: {
      username: req.body.username,
      scores: {
        create: [{ score: req.body.score }],
      },
    },
  });
};

export const getUserWithUsername = async (username) => {
  return await prisma.users.findFirst({
    where: {
      username: username,
    },
    include: {
      scores: {
        orderBy: {
          created_at: "desc",
        },
        select: {
          score: true,
        },
      },
    },
  });
};

export const updateUser = async (username, score) => {
  return await prisma.users.update({
    where: { username: username },
    data: {
      scores: {
        create: [
          {
            score: score,
          },
        ],
      },
    },
  });
};
