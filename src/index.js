import config from "./config.js";
import { Client } from "@nerimity/nerimity.js";
import {
  addXp,
  calculateRequiredXp,
  createUser,
  getGlobalLeaderBoard,
  getServer,
  getServerLeaderBoard,
  getUser,
} from "./db.js";
import { getGroqChatCompletion } from "./groq.js";
import { commands, setupCommands } from "./commands.js";
const bot = new Client({
  urlOverride: config.urlOverride,
});
await setupCommands();

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.username}!`);
  if (!config.dev) {
    bot.user.setActivity({
      action: "Playing",
      name: "Overwatch 2",
      startedAt: 1468882814000, // ana release date 19 july 2016
    });
  }
});



bot.on("messageCreate", async (message) => {
  if (message.user.bot) return;
  if (!message?.channel?.serverId) return;

  await addXp(message.user.id, message.channel.serverId, message.user.username);

  const args = message.content?.split?.(" ") || [];

  const isCommandMessage = message.command;

  if (isCommandMessage) {
    const commandModule = commands.find(
      (c) => c.command === message.command.name
    );
    if (commandModule) {
      return commandModule.run(bot, args, message);
    }
  }
  commands.forEach((command) => {
    command.onMessage?.(bot, message);
  });

  if (isCommandMessage) {
    if (message.command.name === "globalLeaderBoard") {
      return leaderBoardCmd(message, true);
    }
  
    if (message.command.name === "leaderBoard") {
      return leaderBoardCmd(message);
    }
  
    if (message.command.name === "profile") {
      return profileCmd(message, "server");
    }
    if (message.command.name === "globalProfile") {
      return profileCmd(message, "user");
    }
  }
});

bot.on("messageButtonClick", (button) => {
  if (button.id === "clickMeButton") {
    button.respond({
      title: "Hey!",
      content: `Hey there **${button.user?.username}**!`,
    });
  }
});

/**
 * Handles the leaderBoard command by retrieving user information and responding with a leaderboard.
 *
 * @param {import("@nerimity/nerimity.js/build/Client.js").Message} message - The message object containing the user's command.
 */
const leaderBoardCmd = async (message, global = false) => {
  if (global) {
    const users = await getGlobalLeaderBoard();
    message.reply(undefined, {
      htmlEmbed: htmlLeaderBoardBuilder(
        users.map((user) => ({
          username: user.username,
          totalXP: user.totalXp,
        })),
        "global"
      ),
    });
  } else {
    const servers = await getServerLeaderBoard(message.channel.serverId);
    message.reply(undefined, {
      htmlEmbed: htmlLeaderBoardBuilder(
        servers.map((server) => ({
          username: server.user.username,
          totalXP: server.totalXp,
        })),
        "server"
      ),
    });
  }
};

/**
 * Handles the profile command by retrieving user information and responding with XP, level, and username.
 *
 * @param {import("@nerimity/nerimity.js/build/Client.js").Message} message - The message object containing the user's command.
 */
const profileCmd = async (message, profile) => {
  const args = message.content.split(" ");
  const userId = args[1] || message.user.id;

  let user = await getUser(userId);

  const server = await getServer(message.channel.serverId, userId);

  if (!user) {
    message.reply("User not found.");
    return;
  }
  if (profile === "server" && !server) {
    message.reply("User not found.");
    return;
  }

  message.reply(undefined, {
    htmlEmbed: htmlProfileBuilder(server, user, profile),
  });
};
/**
 *
 * @param {import("@nerimity/nerimity.js/build/Client.js").Message} message - The message object containing the user's command.
 */

/**
 * Builds an HTML profile based on the provided server and user information.
 *
 * @param {import('@prisma/client').Server} server - The server information.
 * @param {import('@prisma/client').User} user - The user information.
 * @param {"server" | "user"} profile
 * @return {string} The HTML profile.
 */
const htmlProfileBuilder = (server, user, profile) => {
  const level = profile === "server" ? server.level : user.level;
  const currentXP = profile === "server" ? server.xp : user.xp;
  const xpRequired =
    profile === "server"
      ? calculateRequiredXp(server.level)
      : calculateRequiredXp(user.level);
  const percent = (currentXP / xpRequired) * 100;

  return `
        <div class="ctn">
            <div class="h">${escapeHtml(user.username)}<div class="sh">(${
    profile === "server" ? "Server" : "User"
  } Profile)</div></div>
            <div class="t">Level ${level}</div>
            <div class="t">${currentXP}/${xpRequired}</div>
            <div class="b"><div style="width: ${percent}%"></div></div>

        </div>
        <style>
            .ctn {
                font-family: monospace;
                background-color: #000;
                margin-top: 6px;
                text-align: center;
                border-radius: 6px;
                overflow: hidden;
            }
            .h {
                background-color: var(--primary-color);
                padding: 6px;
                margin-bottom: 6px;
            }
            .sh {
                font-size: 12px;
                color: #ffffff9c;
            }
            .t {
                margin-left: 6px;
                margin-right: 6px;
            }
            .b {
                background-color: #000;
                margin-top: 2px;
                border-radius: 4px;
                border: 1px solid #fff;
                padding: 2px;
                margin: 6px;
            }
            .b div {
                border-radius: 2px;
                height: 8px;
                background-color: #fff;
            }
        </style>
    `;
};
/** *
 * @param {{username: string, totalXP: string}[]} users
 * @param {"server" | "global"} profile
 * @return {string} The HTML profile.
 */
const htmlLeaderBoardBuilder = (users, profile) => {
  return `
        <div class="ctn">
            <div class="h">Leader board<div class="sh">(${
              profile === "server" ? "Server" : "Global"
            } Profile)</div></div>

            ${users
              .map(
                (user) => `
                    <div>${escapeHtml(user.username)} ${user.totalXP}XP</div>
                `
              )
              .join("")}

        </div>
        <style>
            .ctn {
                font-family: monospace;
                background-color: #000;
                margin-top: 6px;
                text-align: center;
                border-radius: 6px;
                overflow: hidden;
            }
            .h {
                background-color: var(--primary-color);
                padding: 6px;
                margin-bottom: 6px;
            }
            .sh {
                font-size: 12px;
                color: #ffffff9c;
            }
        </style>
    `;
};

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

bot.login(config.token);
