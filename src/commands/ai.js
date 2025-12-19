import { getGroqChatCompletion } from "../groq.js";
import {
  replaceRoleMentionWithUsername,
  replaceUserMentionWithUsername,
} from "../utils.js";

export const command = "ai";
export const description = "Talk to ana.";
export const args = "<message>";

/**
 * @param {import("@nerimity/nerimity.js/build/Client.js").Message} message
 */
export const run = async (bot, args, message) => {
  const argsWithoutFirst = args.slice(1);

  const content = argsWithoutFirst.join(" ");

  let transformedContent = replaceUserMentionWithUsername(
    content,
    message.mentions,
    message.channel.server
  );

  transformedContent = replaceRoleMentionWithUsername(
    transformedContent,
    message.channel.server
  );

  const res = await getGroqChatCompletion().catch((err) => console.log(err));

  if (!res) {
    return message.channel.send("Something went wrong. Check console.");
  }
  message.channel.send(
    replaceRoleMentionWithUsername(
      replaceUserMentionWithUsername(
        res,
        message.mentions,
        message.channel.server
      )
    )
  );
};

/**
 * @param {import("@nerimity/nerimity.js/build/Client.js").Client} bot
 * @param {import("@nerimity/nerimity.js/build/Client.js").Message} message
 */
export const onMessage = async (bot, message) => {
  if (message.user.bot) return;
  if (!message.content) return;

  const anaMentioned = message.content.startsWith(`[@:${bot.user.id}]`);

  if (!anaMentioned) return;

  let transformedContent = replaceUserMentionWithUsername(
    message.content,
    message.mentions,
    message.channel.server
  );

  transformedContent = replaceRoleMentionWithUsername(
    transformedContent,
    message.channel.server
  );

  const res = await getGroqChatCompletion(transformedContent).catch((err) =>
    console.log(err)
  );

  if (!res) {
    return message.channel.send("Something went wrong. Check console.");
  }
  message.channel.send(
    replaceRoleMentionWithUsername(
      replaceUserMentionWithUsername(
        res,
        message.mentions,
        message.channel.server
      )
    )
  );
};
