import { ServerChannel } from "@nerimity/nerimity.js";
import { match } from "assert";

export const command = "bossFight";
export const description = "Boss fight test.";

const Attacks = {
  sa: {
    id: "sa",
    name: "Small Attack",
    damage: 10,
  },
  ba: {
    id: "ba",
    name: "Big Attack",
    damage: 20,
  },
};

class Match {
  bossHealth = 100;

  /** @type {import("@nerimity/nerimity.js/build/Client.js").Message} */
  message;

  /** @type {string[]} */
  attackHistory = [];
  /** @type {import("@nerimity/nerimity.js/build/Client.js").ServerChannel)} */
  channel;
  /**
   * @param {{channel: import("@nerimity/nerimity.js/build/Client.js").ServerChannel}} opts
   */
  constructor(opts) {
    this.channel = opts.channel;
  }
  html() {
    return `
    
    <div class="ctn">
  <div class="h">Boss Fight</div>
  <div class="lft">
    <div>Boss 1</div>
    <div>Level 999</div>
    <div>Health ${this.bossHealth}</div>
  </div>
  <div class="h">Attack History</div>
  <div class="rgt">
    ${this.attackHistory.map((a) => `<div>${a}</div>`).join("")}
  </div>

</div>
<style>
  .ctn {
    font-family: monospace;
    background-color: #000;
    border-radius: 6px;
    overflow: hidden;
    width: 200px;
  }

  .h {
    background-color: var(--primary-color);
    padding: 6px;
  }

  .lft {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 120px;
  }
  .rgt {
    height: 120px;
    padding: 4px;
  }
</style>
    


    
    `;
  }
  attack(playerName, damage) {
    this.bossHealth -= damage;
    if (this.bossHealth < 0) {
      this.bossHealth = 0;
    }
    this.attackHistory.push(`${playerName} - ${damage} ATT`);
    if (this.attackHistory.length > 5) {
      this.attackHistory.shift();
    }
    this.message.edit(undefined, { htmlEmbed: this.html() });
  }
}

/** @type {Map<string, Match>} */
const matches = new Map();

/**
 * @param {import("@nerimity/nerimity.js/build/Client.js").Message} message
 */
export const run = async (bot, args, message) => {
  if (!(message.channel instanceof ServerChannel)) {
    return;
  }
  const channelName = message.channel.name.toLowerCase();
  if (!channelName.includes("bot") && !channelName.includes("commands")) {
    return message.reply(
      "This command can only be used in a channel named 'bot' or 'commands'."
    );
  }

  const match =
    matches.get(message.channel.serverId) ||
    new Match({ channel: message.channel });
  matches.set(message.channel.serverId, match);

  if (match.channel.id !== message.channel.id) {
    return message.reply(`A match is already ongoing in ${match.channel}`);
  }

  const createdMessage = await message.channel.send(undefined, {
    htmlEmbed: match.html(),
    buttons: [{ id: "attack", label: "Attack" }],
  });

  match.message = createdMessage;
};

/**
 * @param {import("@nerimity/nerimity.js/build/Client.js").Client} bot
 */
export const onLoad = async (bot) => {
  bot.on(
    "messageButtonClick",
    /**
     * @param {import("@nerimity/nerimity.js").MessageButton} button
     */
    (button) => {
      if (button.id !== "attack") return;
      if (button.type === "modal_click") {
        const server = button.channel.server;
        const userId = button.user.id;
        const member = server.members.cache.get(userId);
        if (!member) return;

        const attack = Attacks[button.data["att-d"]];
        if (!attack) return;
        const match = matches.get(button.channel.serverId);
        if (!match) return;

        if (match.channel.id !== button.channel.id) return;
        if (match.message?.id !== button.messageId) return;
        match.attack(member.user.username, attack.damage);
        if (match.bossHealth === 0) {
          matches.delete(button.channel.serverId);
        }

        return;
      }

      if (button.id === "attack") {
        const match = matches.get(button.channel.serverId);
        if (!match) return;
        if (match.channel.id !== button.channel.id) return;
        if (match.message?.id !== button.messageId) return;

        button.respond({
          title: "Hey!",
          content: `Choose your attack`,
          buttonLabel: "Attack",
          components: [
            {
              id: "att-d",
              type: "dropdown",
              label: "Ability",
              items: Object.values(Attacks).map((a) => ({
                id: a.id,
                label: a.name,
              })),
            },
          ],
        });
      }
    }
  );
};
