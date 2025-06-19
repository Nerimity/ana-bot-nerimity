import Roll from "roll";

export const command = "roll";
export const description = "Roll a dice.";
export const args = "<dice>";


const roll = new Roll();

/**
 * @param {import("@nerimity/nerimity.js/build/Client.js").Message} message
 */
export const run = async (bot, args, message) => {
  const argsWithoutFirst = args.slice(1);

  try {
    const rollOutput = roll.roll(argsWithoutFirst.join(" "))

    return message.reply(rollOutput.result.toString())
  } catch (error) {
    return message.reply(`Invalid dice format.`);
  }
};  
