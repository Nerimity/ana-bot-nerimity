import { getGroqChatCompletion } from "../groq.js";

export const command = "ai";
export const description = "Talk to ana.";
export const args = "<message>";

/**
 * @param {import("@nerimity/nerimity.js/build/Client.js").Message} message
 */
export const run = async (bot, args, message) => {
  const argsWithoutFirst = args.slice(1);

  const res = await getGroqChatCompletion(argsWithoutFirst.join(" ")).catch(
    (err) => console.log(err)
  );

  if (!res) {
    return message.channel.send("Something went wrong. Check console.");
  }
  message.channel.send(res);
};
