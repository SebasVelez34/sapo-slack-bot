const helper = require("./cachon.helper");
const { APP_MENTION_PATTERNS } = require("../../../utils/regex");

const { BOT_USER, SECONDS_IN_HALF_HOUR } = process.env;

const handler = async ({ event, say, client: webClient }) => {
  const { text, channel } = event;

  if (APP_MENTION_PATTERNS.SALUDA_A_UN_CACHON_REGEX.test(text)) {
    helper.connectRedis();
    const CACHONES_KEY = `CACHONES:${channel}`;
    const cachedCachones = await helper.getKey(CACHONES_KEY);

    if (cachedCachones.length)
      await say(`<@${helper.getRandomCachones(cachedCachones)}> ¡Cachón!`);

    const { members: cachones } = await helper.getCachones({
      webClient,
      channel
    });

    const filterdCachones = cachones.filter((item) => item !== BOT_USER);

    await helper.setKeyEx({
      key: CACHONES_KEY,
      seconds: SECONDS_IN_HALF_HOUR,
      data: filterdCachones
    });

    helper.closeRedis();

    if (!cachedCachones.length)
      return await say(
        `<@${helper.getRandomCachones(filterdCachones)}> ¡Cachón!`
      );
  }
};

module.exports = handler;
