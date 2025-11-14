const UserMentionRegex = /\[@:([0-9a-zA-Z]+)\]/g;

/**
 *
 * @param {string} text
 * @param {{username: string}[]} mentions
 */
export const replaceUserMentionWithUsername = (text, mentions) => {
  return text.replace(UserMentionRegex, (match, userId) => {
    if (userId === "e") {
      return "@everyone";
    }
    const mention = mentions.find((m) => m.id === userId);
    return mention ? `@${mention.username}` : `@${userId}`;
  });
};
