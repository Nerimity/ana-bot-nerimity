import { RolePermissions } from "@nerimity/nerimity.js";

export const command = "ban";
export const description = "Ban a user.";
export const args = "<User | userId> <reason>?";
export const permissions = RolePermissions.BAN;

/**
 * @param {import("@nerimity/nerimity.js/build/Client.js").Client} bot
 * @param {import("@nerimity/nerimity.js/build/Client.js").Message} message
 */
export const run = async (bot, args, message) => {
  const [, , reason] = args;

  if (!message.member) {
    return message.channel.send("This command can only be used in a server.");
  }
  if (!message.member.hasPermission(RolePermissions.BAN)) {
    return message.channel.send("You do not have permission to ban users.");
  }

  if (!message.mentions[0]) {
    return message.channel.send("Please mention a user to ban.");
  }
  const res = await message.channel.server
    .banMember(message.mentions[0]?.id)
    .catch((err) => {
      message.channel.send(err.message || "Something went wrong.", {
        silent: true,
      });
      return false;
    });
  if (res === false) return;
  message.channel.send(`${message.mentions[0]?.username} has been banned.`, {
    silent: true,
  });
};
