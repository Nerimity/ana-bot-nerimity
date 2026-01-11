import { Client } from "@nerimity/nerimity.js";
import { commands, setupCommands } from "./commands.js";
import config from "./config.js";
await setupCommands();

const client = new Client();

const oldCommands = [
  {
    name: "globalLeaderBoard",
    description: "Global Leaderboard.",
  },
  {
    name: "leaderBoard",
    description: "Leaderboard of a server.",
  },
  {
    name: "profile",
    description: "Server Profile of a user.",
    args: "<UserMention> raw?",
  },
  {
    name: "globalProfile",
    description: "Global profile of a user.",
    args: "<UserMention> raw?",
  },
];
client
  .updateCommands(config.token, [
    ...commands.map((command) => ({
      name: command.command,
      description: command.description,
      ...(command.args ? { args: command.args } : {}),
      ...(command.permissions ? { permissions: command.permissions } : {}),
    })),
    ...oldCommands,
  ])
  .then((res) => {
    if (!res?.status) {
      console.log(res);
      process.exit(1);
    }
    console.log("Commands registered!");
    process.exit(0);
  });
