import { Collection } from "@nerimity/nerimity.js";
import {
  getGroqChatCompletion,
  getGroqChatCompletionFromMessages,
} from "../groq.js";
import {
  replaceRoleMentionWithUsername,
  replaceUserMentionWithUsername,
} from "../utils.js";

export const command = "ai";
export const description = "Talk to ana.";
export const args = "<message>";

/**
 *
 * @param {import("@nerimity/nerimity.js/build/classes/Message.js").Message} message
 */
const messageReplies = (message) => {
  if (message.replies.size === 0) return [message];
  let messages = [message];
  message.replies.forEach((reply) => {
    reply = message.client.messages.cache.get(reply.id) || reply;
    messages = messages.concat(messageReplies(reply));
  });
  return messages;
};

/**
 * @param {import("@nerimity/nerimity.js/build/classes/Message.js").Message} message
 */
export const run = async (bot, args, message) => {
  const argsWithoutFirst = args.slice(1);

  const content = argsWithoutFirst.join(" ");

  let transformedContent = replaceUserMentionWithUsername(
    content,
    message.mentions,
    message.channel.server,
  );

  transformedContent = replaceRoleMentionWithUsername(
    transformedContent,
    message.channel.server,
  );

  const res = await getGroqChatCompletion(transformedContent).catch((err) =>
    console.log(err),
  );

  if (!res) {
    return message.channel.send("Something went wrong. Check console.");
  }
  message.reply(
    replaceRoleMentionWithUsername(
      replaceUserMentionWithUsername(
        res,
        message.mentions,
        message.channel.server,
      ),
    ),
  );
};

/**
 * @param {import("@nerimity/nerimity.js/build/Client.js").Client} bot
 * @param {import("@nerimity/nerimity.js/build/classes/Message.js").Message} message
 */
export const onMessage = async (bot, message) => {
  if (message.user.bot) return;
  if (!message.content) return;

  const replies = messageReplies(message);

  const reversedReplies = replies
    .reverse()
    .map((m) => {
      let transformedContent = replaceUserMentionWithUsername(
        m.content,
        m.mentions,
        m.channel.server,
      );

      transformedContent = replaceRoleMentionWithUsername(
        transformedContent,
        m.channel.server,
      );

      const messageByAna = m.user.id === bot.user.id;

      return {
        role: messageByAna ? "assistant" : "user",
        ...(!messageByAna
          ? { name: m.member.nickname || m.user.username }
          : {}),
        content: transformedContent,
      };
    })
    .filter((m) => m.content && m.content.trim() !== "")
    .slice(-10);

  const anaMentioned =
    [...message.replies.values()].find((r) => r.user.id === bot.user.id) ||
    message.content.startsWith(`[@:${bot.user.id}]`);

  if (!anaMentioned) return;

  let transformedContent = replaceUserMentionWithUsername(
    message.content,
    message.mentions,
    message.channel.server,
  );

  transformedContent = replaceRoleMentionWithUsername(
    transformedContent,
    message.channel.server,
  );

  const res = await getGroqChatCompletionFromMessages(reversedReplies).catch(
    (err) => console.log(err),
  );

  if (!res) {
    return message.channel.send("Something went wrong. Check console.");
  }
  message.reply(
    replaceRoleMentionWithUsername(
      replaceUserMentionWithUsername(
        res,
        message.mentions,
        message.channel.server,
      ),
    ),
  );
};
