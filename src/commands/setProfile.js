import { htmlToJson } from "@nerimity/html-embed";
import { updateUser } from "../db.js";
export const command = "setProfile";
export const description = "Set custom html profile";
export const args = "<html?>";

/**
 * @param {import("@nerimity/nerimity.js/build/Client.js").Message} message
 */
export const run = async (bot, args, message) => {
  const argsWithoutFirst = args.slice(1);

  const content = argsWithoutFirst.join(" ");

  if (!content) {
    return message.reply(
      "HTML Not Provided `/setProfile <div>{username}</div>`\n" +
        "**Available Placeholders:**\n" +
        "`{username}` - Your username\n" +
        "`{xp}` - Your XP\n" +
        "`{level}` - Your Level\n" +
        "`{xp_required}` - XP required to level up\n" +
        "`{xp_percent}` - Your XP Percentage\n" +
        "`{xp_total}` - Your Total XP\n"
    );
  }

  let isInvalid = false;
  try {
    htmlToJson(content);
  } catch (e) {
    isInvalid = e.message;
  }
  if (isInvalid) {
    return message.reply(`Invalid HTML: ${isInvalid}`);
  }
  await updateUser(message.user.id, { customProfileHtml: content });
  return message.reply("Profile HTML updated!");
  
};
