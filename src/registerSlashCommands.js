import { Client } from "@nerimity/nerimity.js";
import { commands, setupCommands } from "./commands.js";
import config from "./config.js";
await setupCommands()


const client = new Client();





client.updateCommands(config.token, commands.map(command => ({
  name: command.command,
  description: command.description
}))).then(() => {
  console.log("Commands registered!")
  process.exit(0);
});