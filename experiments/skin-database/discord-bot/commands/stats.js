const { getCache } = require("../info");
const { getStats } = require("../../data/skins");

async function handler(message) {
  const info = getCache();
  let classic = 0;
  const { tweeted, approved, rejected, tweetable } = await getStats();
  Object.values(info).forEach((skin) => {
    if (skin.type === "CLASSIC") {
      classic++;
    }
  });
  await message.channel.send(`Unique Skins: ${classic.toLocaleString()}
Tweeted: ${tweeted.toLocaleString()}
Rejected: ${rejected.toLocaleString()}
Approved: ${approved.toLocaleString()}
Tweetable: ${tweetable.toLocaleString()}
 `);
}

module.exports = {
  command: "stats",
  handler,
  usage: "",
  description: "Give some statistics about the skin archive",
};
