const helper = require("./cachon.helper");
const { APP_MENTION_PATTERNS } = require("../../../utils/regex");

const { BOT_USER, SECONDS_IN_HALF_HOUR } = process.env;

const handler = async ({ event, say, client }) => {
  const { text, channel } = event;

  if (APP_MENTION_PATTERNS.SALUDA_A_UN_CACHON_REGEX.test(text)) {
    helper.connectRedis();
    const CACHONES_KEY = `SLACK:CACHONES:${channel}`;
    const MORE_CACHON_KEY = `SLACK:MORE:CACHONES:${channel}`;
    const cachedCachones = await helper.getKey(CACHONES_KEY);
    const filterdCachones = [];
    let cachonId = "";

    if (cachedCachones.length) {
      cachonId = helper.getRandomCachones(cachedCachones);
      await helper.incrementCachonScore({
        key: MORE_CACHON_KEY,
        increment: 1,
        member: cachonId
      });
      await say(`<@${cachonId}> ¡Cachón! :cachon:`);
    }

    const { members: cachones } = await helper.getCachones({
      client,
      channel
    });

    for (const cachon of cachones) {
      if (cachon !== BOT_USER) {
        filterdCachones.push(cachon);

        const cachonInfo = await helper.getUserInfo({
          client,
          userId: cachon
        });

        await helper.setKey({
          key: `SLACK:USER:${cachon}`,
          data: cachonInfo,
          options: ["NX"]
        });
      }
    }

    await helper.setKeyEx({
      key: CACHONES_KEY,
      seconds: SECONDS_IN_HALF_HOUR,
      data: filterdCachones
    });

    if (!cachedCachones.length) {
      cachonId = helper.getRandomCachones(filterdCachones);
      await helper.incrementCachonScore({
        key: MORE_CACHON_KEY,
        increment: 1,
        member: cachonId
      });

      helper.closeRedis();
      return await say(`<@${cachonId}> ¡Cachón! :cachon:`);
    }
  }
};

module.exports = handler;
