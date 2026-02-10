import { RolePermissions } from "@nerimity/nerimity.js";
import { addWarning } from "../db.js";

export const command = "warn";
export const description = "Warn a user.";
export const args = "<UserMention> <reason>?";
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
    return message.channel.send(
      "This command requires the Ban Members permission.",
    );
  }

  if (!message.mentions[0]) {
    return message.channel.send("Please mention a user to warn.");
  }

  const warnedRes = await addWarning(
    message.user.id,
    message.mentions[0].id,
    message.channel.server.id,
    reason || "No reason provided.",
  ).catch((err) => {
    console.log(err);
    message.channel.send(err.message || "Something went wrong.", {
      silent: true,
    });
    return false;
  });
  if (warnedRes === false) return;

  message.channel.send(
    `**${message.mentions[0]?.username}** has been warned. \n\nThis user now has: \n${warnedRes.serverWarnCount} warning(s) in **this server**\n${warnedRes.totalWarnCount} warning(s) **on Nerimity**.`,
    {
      silent: true,
    },
  );
};
