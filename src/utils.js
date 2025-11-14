const UserMentionRegex = /\[@:([0-9a-zA-Z]+)\]/g;

/**
 *
 * @param {string} text
 * @param {{username: string}[]} mentions
 * @param {import("@nerimity/nerimity.js/build/Client.js").Server} server
 */
export const replaceUserMentionWithUsername = (text, mentions, server) => {
  return text.replace(UserMentionRegex, (match, userId) => {
    if (userId === "e") {
      return "@everyone";
    }
    const mention = mentions.find((m) => m.id === userId)?.username;
    const member = server.members.cache.get(userId)?.user?.username;
    const username = mention || member;
    return username ? `@${username}` : `@${userId}`;
  });
};
