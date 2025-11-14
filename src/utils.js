const UserMentionRegex = /\[@:([0-9]+)\]/g;

/**
 *
 * @param {string} text
 * @param {{username: string}[]} mentions
 */
export const replaceUserMentionWithUsername = (text, mentions) => {
  return text.replace(UserMentionRegex, (match, userId) => {
    const mention = mentions.find((m) => m.id === userId);
    return mention ? `@${mention.username}` : match;
  });
};
