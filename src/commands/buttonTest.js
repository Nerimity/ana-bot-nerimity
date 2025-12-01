export const command = "buttonTest";
export const description = "Show a test button.";

/**
 * @param {import("@nerimity/nerimity.js/build/Client.js").Message} message
 */
export const run = async (bot, args, message) => {
  return message.reply("Click on the button below.", {
    buttons: [{ id: "clickMeButton", label: "Click Me", style: "primary" }],
  });
};

/**
 * @param {import("@nerimity/nerimity.js/build/Client.js").Client} bot
 */
export const onLoad = async (bot) => {
  bot.on("messageButtonClick", (button) => {
    if (button.type === "modal_click") {
      const server = button.channel.server;
      const userId = button.user.id;
      const member = server.members.cache.get(userId);
      button.channel.send(
        `${member} is feeling ${button.data["hru-d"]} right now!`
      );
      if (!member) return;

      return;
    }

    if (button.id === "clickMeButton") {
      button.respond({
        title: "Hey!",
        content: `Hey there **${button.user?.username}**!`,
        buttonLabel: "Hello <3",
        components: [
          {
            id: "",
            type: "text",
            content: "Text Component",
          },
          {
            id: "hru-d",
            type: "dropdown",
            label: "How are you doing?",
            items: [
              { id: "amazing", label: "Amazing" },
              { id: "bad", label: "Bad" },
            ],
          },
          {
            id: "ic",
            type: "input",
            label: "Input Component",
            placeholder: "Input placeholder",
          },
        ],
      });
    }
  });
};
