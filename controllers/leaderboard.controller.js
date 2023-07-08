const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getLeaderboard = async () => {
  return await prisma.leaderboard.findMany();
};

module.exports = { getLeaderboard };
