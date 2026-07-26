export const command = "shareActivity";
export const description = "Share activity status.";
export const args = "<User>?"

/**
 * @param {import("@nerimity/nerimity.js/build/classes/Message").Message} message
 */
export const run = async (bot, args, message) => {

  const userId = args[1]
  let user = message.mentions[0];
  if (!user && userId) {
    user = message.member.server.members.cache.get(userId)?.user;
    if (!user) {
      return message.channel.send("Invalid user.")
    }
  }
  if (!user && !userId) {
    user = message.user
  }
  if (!user) return;

  if (!user.presence?.activities?.length) {
    return message.channel.send("This user has no activity.")
  }

  message.reply(undefined, {
    htmlEmbed: buildPresenceHtml(user.presence)
  })


};


/**
 * @param {import("@nerimity/nerimity.js/build/classes/User").Presence} presence
 */
const buildPresenceHtml = (presence) => {
  const activities = presence.activities

  return `
    <div class="items">
      ${activities.map(a => `
        <div class="item">
        ${a.imgSrc ? `
            <img src="${a.imgSrc}"/>
          
          ` : ""}
          <div>
            <span><span class="act">${a.action}</span> ${a.name}</span><br/>
           ${a.title ? ` ${a.link ? `<a href="${a.link}">${a.title}</a><br/>` : `${a.title}<br/>`}` : ""}
            ${a.subtitle ? a.subtitle : ""}
          </div>

        </div>        
        
        
      `)}
    </div>

    <style>
      .items {display: flex; flex-direction: column; gap: 6px;}
      .item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: black;
          border-radius: 8px;
          padding: 6px;
      }
      a {
          color: var(--primary-color);
      }
      .act {
        opacity: 0.8;
      }
      img {width: 54px; height: 54px; border-radius: 4px;}
    </style>
  
  `


}