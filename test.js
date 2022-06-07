var clickatell = require("clickatell-platform");

const newApikey = process.env.API_KEY
//clickatell.sendMessageRest("Hello testing message", ["27XXXXX-NUMBER"], "APIKEY-HERE");
clickatell.sendMessageHttp("Hello testing message", ["256706440588"], newApikey);