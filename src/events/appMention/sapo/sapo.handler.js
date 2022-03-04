const helper = require("./sapo.helper");
const { APP_MENTION_PATTERNS } = require("../../../utils/regex");
const { CONSTANTS } = require("../../../utils/constants");

const { BOT_USER, SECONDS_IN_HALF_HOUR } = process.env;

const handler = async ({ event, say, client }) => {
  const { text, channel, user } = event;
  
  if (APP_MENTION_PATTERNS.SALUDA_A_UN_SAPO_REGEX.test(text)) {
    helper.connectRedis();
    const SAPOS_KEY = `SLACK:SAPOS:${channel}`;
    const MORE_SAPO_KEY = `SLACK:MORE:SAPO:${channel}`;
    const cachedSapos = await helper.getKey(SAPOS_KEY);
    const filterdSapos = [];
    let sapoId = "";
    let botProfile = "";
    if (cachedSapos.length) {
      sapoId = helper.getRandomSapos(cachedSapos);
      await helper.incrementSapoScore({
        key: MORE_SAPO_KEY,
        increment: 1,
        member: sapoId
      });
      if(sapoId === CONSTANTS.fridayBotId){
        await say(`<@${user}> :sapo-perro: :frog: ¡Sapooooooooooooooooooooooooo perro pasmado! :frog::sapo-perro:`);
        await say(`<@${sapoId}> saluda a un cachón`);
      }else{
        await say(`<@${sapoId}> ¡Sapo! :sapo-perro:`);
      }
    }

    const { members: sapos } = await helper.getSapos({
      client,
      channel
    });

    for (const sapo of sapos) {
      if (sapo !== BOT_USER) {
        filterdSapos.push(sapo);

        const sapoInfo = await helper.getUserInfo({
          client,
          userId: sapo
        });

        await helper.setKey({
          key: `SLACK:USER:${sapo}`,
          data: sapoInfo,
          options: ["NX"]
        });
      }
    }

    await helper.setKeyEx({
      key: SAPOS_KEY,
      seconds: SECONDS_IN_HALF_HOUR,
      data: filterdSapos
    });

    if (!cachedSapos.length) {
      sapoId = helper.getRandomSapos(filterdSapos);
      await helper.incrementSapoScore({
        key: MORE_SAPO_KEY,
        increment: 1,
        member: sapoId
      });

      helper.closeRedis();
      return await say(`<@${sapoId}> ¡Sapo! :sapo-perro:`);
    }
  }
};

module.exports = handler;
