var jwt = require("jsonwebtoken");

var payload = {
  resource: { question: 2 },
  params: {},
  exp: Math.round(Date.now() / 1000) + (10 * 60)
};
var token = jwt.sign(payload, process.env.METABASE_SECRET_KEY);

var iframeUrl = process.env.METABASE_SITE_URL + "/embed/question/" + token + "#bordered=true&titled=true";

module.exports = iframeUrl;