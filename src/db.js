import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getGlobalLeaderBoard = () => {
  return prisma.user.findMany({
    take: 10,
    orderBy: {
      totalXp: "desc",
    },
  });
};
export const getServerLeaderBoard = (serverId) => {
  return prisma.server.findMany({
    take: 10,
    where: {
      id: serverId,
    },
    include: { user: { select: { username: true } } },
    orderBy: {
      totalXp: "desc",
    },
  });
};

export const getServer = async (serverId, userId) => {
  return prisma.server.findUnique({
    where: {
      id_userId: {
        userId,
        id: serverId,
      },
    },
  });
};

export const getUser = async (userId) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
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
  prisma.warning.delete({
    where: {
      id: serverWarnCount.id,
    },
  });
  return true;
};

export const calculateRequiredXp = (currentLevel) =>
  5 * (currentLevel + 1) ** 2 + 50 * (currentLevel + 1) + 100;
