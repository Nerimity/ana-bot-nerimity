export const command = "wordle";
export const description = "Multiplayer Wordle game!";
export const args = "start <4-7>";
import fs from "fs/promises";
import { addXp } from "../db.js";
import { define } from "../dictionary.js";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const words4 = JSON.parse(
  await fs.readFile(__dirname + "/../4-letter-words.json", "utf-8")
);
const words5 = JSON.parse(
  await fs.readFile(__dirname + "/../5-letter-words.json", "utf-8")
);
const words6 = JSON.parse(
  await fs.readFile(__dirname + "/../6-letter-words.json", "utf-8")
);
const words7 = JSON.parse(
  await fs.readFile(__dirname + "/../7-letter-words.json", "utf-8")
);

const wordsObj = {
  4: words4,
  5: words5,
  6: words6,
  7: words7,
};
const maxNum = Object.keys(wordsObj).sort((a, b) => b - a)[0];
const minNum = Object.keys(wordsObj).sort((a, b) => a - b)[0];

const randomWord = (words) => {
  if (!words) return;
  return words[Math.floor(Math.random() * words.length)];
};

const matchedWords = (word, guess) => {
  let str = "";
  let wordCharCount = {};

  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    wordCharCount[char] = (wordCharCount[char] || 0) + 1;
  }
  const orangeCharCount = {};

  for (let i = 0; i < word.length; i++) {
    if (word[i] === guess[i]) {
      let totalChars = orangeCharCount[guess[i]] ?? wordCharCount[guess[i]];
      totalChars--;
      orangeCharCount[guess[i]] = totalChars;
    } else if (word.includes(guess[i])) {
      let totalChars = orangeCharCount[guess[i]] ?? wordCharCount[guess[i]];
      orangeCharCount[guess[i]] = totalChars;
    }
  }

  for (let i = 0; i < word.length; i++) {
    if (word[i] === guess[i]) {
      str += `<div class="g">${guess[i].toUpperCase()}</div>`;
    } else if (word.includes(guess[i])) {
      const count = orangeCharCount[guess[i]];
      if (!count) {
        str += `<div class="w">${guess[i].toUpperCase()}</div>`;
        continue;
      }
      orangeCharCount[guess[i]]--;
      str += `<div class="o">${guess[i].toUpperCase()}</div>`;
    } else {
      str += `<div class="w">${guess[i].toUpperCase()}</div>`;
    }
  }

  return `
   <span>
          ${str}
        </span>
        <style>
        span {
          display: flex;
          gap: 2px;
        }
          div {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            background: red;
            font-size: 22px;
            font-weight: bold;
            color: white;
          }
            .g {
              background: #6aaa64;
              }
            .o {
              background: #b59f3b;
              }
            .w {
              background: #3a3a3c;
              }
        </style>
  `;
};

/**
 * @type {Record<string, {
 *   word: string
 *   length: number
 *   messages: import("@nerimity/nerimity.js/build/Client.js").Message[]
 * }>}
 */
const lobbies = {};

/**
 * @type {Record<string , import("@nerimity/nerimity.js/build/Client.js").Message[][]>}
 */
const roundMessages = {};

/**
 * @param {import("@nerimity/nerimity.js/build/Client.js").Client} bot
 * @param {import("@nerimity/nerimity.js/build/Client.js").Message} message
 */
export const run = async (bot, _args, message) => {
  /**
   * @type {import("@nerimity/nerimity.js/build/Client.js").Server | undefined} server
   */
  const server = message.channel.server;
  if (!server) return;
  const subCommand = _args[1];
  if (subCommand === "start") {
    return startCommand(bot, _args, message);
  }
  message.channel.send(`To start a game, type /wordle 5\nMin: ${minNum} Max: ${maxNum}`);
};

/**
 * @param {import("@nerimity/nerimity.js/build/Client.js").Message} message
 */
export const onMessage = async (bot, message) => {
  if (message.user.bot) return;
  const lobby = { ...lobbies[message.channel.serverId] };
  if (!lobby) return;
  const channel = message.channel;
  if (!channel.name.toLowerCase().includes("wordle")) {
    return;
  }
  const isLengthWord = message.content.length === lobby.length;
  if (!isLengthWord) {
    return;
  }
  const letterWord = message.content.toLowerCase();
  const isValidWord = wordsObj[lobby.length].includes(letterWord);
  const hasWon = letterWord === lobby.word;
  if (hasWon) {
    delete lobbies[message.channel.serverId];
  }

  if (!isValidWord) return;
  const res = await message.delete().catch(() => {
    console.log("Missing permission: Delete message.");
    return false;
  });
  if (res === false) return;

  let msg = await channel.send("* *", {
    htmlEmbed: matchedWords(lobby.word, letterWord),
    silent: true,
  });
  if (!hasWon) {
    lobbies[message.channel.serverId]?.messages.push(msg);
  }
  if (hasWon) {
    roundMessages[channel.serverId].at(-1).push(...lobby.messages);
    msg = await msg.edit(msg.content + `\n${message.user} won! (+50xp)`);
    await addXp(
      message.user.id,
      message.channel.serverId,
      message.user.username,
      50
    );
    const definition = await define(letterWord);
    if (definition) {
      await msg.edit(msg.content + `\n\n${letterWord}: ` + definition);
    }
  }
};

/**
 * @param {import("@nerimity/nerimity.js/build/Client.js").Client} bot
 * @param {import("@nerimity/nerimiwwwty.js/build/Client.js").Message} message
 */
const startCommand = async (bot, args, message) => {
  const channel = message.channel;
  if (!channel.name.toLowerCase().includes("wordle")) {
    return channel.send(
      "This command can only be used in a channel named 'Wordle'"
    );
  }
  const isAlreadyStarted = lobbies[channel.serverId];
  if (isAlreadyStarted) {
    return channel.send("There is already a game in progress.");
  }
  const letterWords = parseInt(args[2]) || 5;

  const word = randomWord(wordsObj[letterWords]);
  if (!word) {

    return channel.send(
      "Invalid. Please enter a number between " + minNum + " and " + maxNum
    );
  }
  roundMessages[channel.serverId] = roundMessages[channel.serverId] || [];
  roundMessages[channel.serverId].push([]);
  lobbies[channel.serverId] = {
    word,
    length: letterWords,
    messages: [],
  };
  channel.send("Game Started! (" + letterWords + " letters)");
};

setInterval(() => {
  for (const property in roundMessages) {
    const serverRound = roundMessages[property];

    if (serverRound.length <= 2) {
      continue;
    }

    const messages = serverRound[0];
    if (!messages?.length) {
      roundMessages[property] = serverRound.filter((_, i) => i !== 0);
      continue;
    }
    const message = messages.shift();
    message?.delete().catch(() => {});
    break;
  }
}, 5000);
