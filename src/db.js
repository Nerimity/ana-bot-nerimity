import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaBetterSqlite3({ url: "file:./prisma/db/db.db" });
const prisma = new PrismaClient({ adapter });

export const getGlobalLeaderBoard = async (userId) => {
  const top = await prisma.user.findMany({
    take: 10,
    orderBy: { totalXp: "desc" },
  });

  const leaderboard = top.map((u, i) => ({ ...u, rank: i + 1 }));

  const isInTop10 = top.some((u) => u.id === userId);

  if (userId && !isInTop10) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      const higherCount = await prisma.user.count({
        where: { totalXp: { gt: user.totalXp } },
      });

      leaderboard.push({ ...user, rank: higherCount + 1 });
    }
  }

  return leaderboard;
};

export const getServerLeaderBoard = async (serverId, userId) => {
  const top = await prisma.server.findMany({
    take: 10,
    where: { id: serverId },
    include: { user: { select: { username: true } } },
    orderBy: { totalXp: "desc" },
  });

  const leaderboard = top.map((s, i) => ({ ...s, rank: i + 1 }));

  const isInTop10 = top.some((s) => s.userId === userId);

  if (userId && !isInTop10) {
    const userServer = await prisma.server.findUnique({
      where: { id_userId: { id: serverId, userId } },
      include: { user: { select: { username: true } } },
    });

    if (userServer) {
      const higherCount = await prisma.server.count({
        where: { id: serverId, totalXp: { gt: userServer.totalXp } },
      });

      leaderboard.push({ ...userServer, rank: higherCount + 1 });
    }
  }

  return leaderboard;
};

export const getServer = async (serverId, userId, includeRank = false) => {
  const server = await prisma.server.findUnique({
    where: {
      id_userId: { id: serverId, userId },
    },
  });

  if (!server) return null;

  if (includeRank) {
    const higherCount = await prisma.server.count({
      where: { id: serverId, totalXp: { gt: server.totalXp } },
    });
    server.rank = higherCount + 1;
  }

  return server;
};

export const getUser = async (userId, includeRank = false) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) return null;

  if (includeRank) {
    const higherCount = await prisma.user.count({
      where: { totalXp: { gt: user.totalXp } },
    });
    user.rank = higherCount + 1;
  }

  return user;
};

/**
 * Updates a user's information.
 *
 * @param {Object} data - The user data to update.
 * @param {number} data.level - The new level of the user.
 * @param {number} data.xp - The new XP of the user.
 * @param {string} data.username - The new username of the user.
 * @param {string} data.customProfileHtml - The new custom profile HTML of the user.
 * @return {Promise<void>} A promise that resolves when the update is complete.
 */
export const updateUser = async (userId, data) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data,
  });
  return user;
};

export const createUser = async (userId, username) => {
  const user = await prisma.user.create({
    data: {
      id: userId,
      username,
    },
  });
  return user;
};
export const createServer = async (userId, serverId) => {
  const user = await prisma.server.create({
    data: {
      id: serverId,
      userId,
    },
  });
  return user;
};

export const addXp = async (userId, serverId, username, customXp) => {
  let user = await prisma.user.findUnique({
    where: { id: userId },
    select: { xp: true, level: true },
  });

  let server = await getServer(serverId, userId);

  if (!user) user = await createUser(userId, username);
  if (!server) server = await createServer(userId, serverId);

  const globalXPToAdd = customXp || 10;
  let newGlobalXp = user.xp + globalXPToAdd;
  let newGlobalLevel = user.level;

  let globalRequiredXp = calculateRequiredXp(newGlobalLevel);
  while (newGlobalXp >= globalRequiredXp) {
    newGlobalXp -= globalRequiredXp;
    newGlobalLevel++;
    globalRequiredXp = calculateRequiredXp(newGlobalLevel);
  }

  const serverXPToAdd = customXp || 10;
  let newServerXp = server.xp + serverXPToAdd;
  let newServerLevel = server.level;

  let serverRequiredXp = calculateRequiredXp(newServerLevel);
  while (newServerXp >= serverRequiredXp) {
    newServerXp -= serverRequiredXp;
    newServerLevel++;
    serverRequiredXp = calculateRequiredXp(newServerLevel);
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      xp: newGlobalXp,
      level: newGlobalLevel,
      username,
      totalXp: { increment: globalXPToAdd },
      servers: {
        update: {
          where: { id_userId: { id: serverId, userId } },
          data: {
            xp: newServerXp,
            level: newServerLevel,
            totalXp: { increment: serverXPToAdd },
          },
        },
      },
    },
  });

  return {
    globalLevelUp: newGlobalLevel > user.level,
    globalLevelsGained: newGlobalLevel - user.level,
    globalXp: newGlobalXp,
    globalLevel: newGlobalLevel,

    serverLevelUp: newServerLevel > server.level,
    serverLevelsGained: newServerLevel - server.level,
    serverXp: newServerXp,
    serverLevel: newServerLevel,
  };
};

export const addWarning = async (requesterUserid, userId, serverId, reason) => {
  const serverWarnCount = await prisma.warning.count({
    where: {
      userId,
      serverId,
    },
  });
  const totalWarnCount = await prisma.warning.count({
    where: {
      userId,
    },
  });
  const warning = await prisma.warning.create({
    data: {
      userId,
      serverId,
      reason,
      warnedByUserId: requesterUserid,
    },
  });
  return {
    totalWarnCount: totalWarnCount + 1,
    serverWarnCount: serverWarnCount + 1,
    warning,
  };
};

export const removeWarning = async (userId, serverId) => {
  const serverWarnCount = await prisma.warning.findFirst({
    where: {
      userId,
      serverId,
    },
  });
  if (!serverWarnCount) {
    return false;
  }
  await prisma.warning.delete({
    where: {
      id: serverWarnCount.id,
    },
  });
  return true;
};

export const calculateRequiredXp = (currentLevel) =>
  5 * (currentLevel + 1) ** 2 + 50 * (currentLevel + 1) + 100;
