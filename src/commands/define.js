import { define } from "../dictionary.js";
export const command = "define";
export const description = "Get the definition of a word.";
export const args = "<word>";

/**
 * @param {string[]} args
 * @param {import("@nerimity/nerimity.js/build/Client.js").Message} message
 */
export const run = async (bot, args, message) => {
  const word = args.splice(1).join(" ");
  const definition = await define(word);
  if (!definition) {
    return message.channel.send("Definition not found.");
  }
  message.channel.send(definition);
};
