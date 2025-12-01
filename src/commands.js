import fs from "fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const commandFiles = await fs.readdir(__dirname + "/commands");

/** @type {{command: string, description: string, run: (bot, args, message) => void, onLoad?: (bot) => void, onMessage?: (bot, message) => void}[]} */
export let commands = [];

/**
 *
 * @param {import("@nerimity/nerimity.js/build/Client.js").Client} bot
 */
export const setupCommands = async (bot) => {
  commands = await Promise.all(
    commandFiles.map((file) => import(`./commands/${file}`))
  );
  commands.forEach((command) => {
    command.onLoad?.(bot);
  });
};
