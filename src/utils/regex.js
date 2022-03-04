const APP_MENTION_PATTERNS = {
  SALUDA_A_UN_SAPO_REGEX: new RegExp(/saluda a un sapo$/, "i"),
  QUIEN_ES_EL_MAS_SAPO_REGEX: new RegExp(
    /¿qui(e|é)n es el m(?:a|á)s sapo\?$/,
    "i"
  ),
  TOP_SAPO_REGEX: new RegExp(/top (\d+) sapos$/, "i")
};

module.exports = {
  APP_MENTION_PATTERNS
};
