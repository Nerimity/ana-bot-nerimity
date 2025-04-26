export const command = "html";
export const description = "html message.";
export const args = "<html>";
/**
 * @param {import("@nerimity/nerimity.js/build/Client.js").Message} message
 */
export const run = async (bot, args, message) => {
  const content = args.splice(1).join(" ");

   message.channel.send(message.user.toString(), {htmlEmbed: content, silent: true}).catch((err) => {
    message.channel.send(err.raw.message || "Something went wrong.", {silent: true});
  });

  // setTimeout(() => message.delete(), 30000); // 30 seconds
};
