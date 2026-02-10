import { RolePermissions } from "@nerimity/nerimity.js";
import { addWarning, removeWarning } from "../db.js";

export const command = "unwarn";
export const description = "Remove a warning from a user.";
export const args = "<UserMention>";
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
    return message.channel.send("Please mention a user to unwarn.");
  }

  const status = await removeWarning(
    message.mentions[0].id,
    message.channel.server.id,
  ).catch((err) => {
    console.log(err);
    message.channel.send(err.message || "Something went wrong.", {
      silent: true,
    });
    return null;
  });
  if (status === null) return;

  if (!status) {
    return message.channel.send(
      `**${message.mentions[0]?.username}** has no warnings in this server.`,
      {
        silent: true,
      },
    );
  }

  message.channel.send(
    `**${message.mentions[0]?.username}** has been unwarned.`,
    {
      silent: true,
    },
  );
};
