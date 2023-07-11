const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  return await prisma.users.findMany();
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
      username: username,
    },
  });
};

const getUserWithUsername = async (username) => {
  return await prisma.users.findFirst({
    where: {
      username: username,
    },
  });
};

const updateUser = async (id, data) => {
  return await prisma.users.update({
    where: { id: id },
    data: { data },
  });
};
