const helper = require("./top-cachones.helper");

const { APP_MENTION_PATTERNS } = require("../../../utils/regex");

const handler = async ({ event, say, client }) => {
  try {
    const { text, channel } = event;
    if (APP_MENTION_PATTERNS.TOP_CACHON_REGEX.test(text)) {
      helper.connectRedis();
      const [, top] = text.match(APP_MENTION_PATTERNS.TOP_CACHON_REGEX);

      const MORE_CACHON_KEY = `SLACK:MORE:CACHONES:${channel}`;
      const moreCachon = await helper.zRevRange({
        key: MORE_CACHON_KEY,
        stop: top - 1
      });
      helper.closeRedis();

      if (moreCachon.length > 1) {
        return await say(
          `Los más cachones son:\n ${moreCachon
            .map((item) => `<@${item}> :cachon:`)
            .join("\n")}`
        );
      } else if (moreCachon.length === 1) {
        return await say(`El más cachón es <@${moreCachon[0]}> :cachon:`);
      }

      return await say(`<!channel> Todos son cachones :love-cachon: `);
    }
  } catch (error) {
    return await say(`:boom: ERROR: ${error.message}`);
  }
};

module.exports = handler;
