function(ellipsis) {
  const checkContext = require('checkContext');
const moment = require('moment-timezone');
const Request = require("Request");

const msg = ellipsis.event.message;
if (checkContext(ellipsis) && msg) {
  const request = new Request({
    timeZone: ellipsis.team.timeZone,
    description: msg.text,
    permalink: msg.permalink,
    requestedAt: moment().tz(ellipsis.team.timeZone)
  });
  ellipsis.success(`Adding a new request for \`${msg.text}\`…`, {
    next: {
      actionName: "saveRequest",
      args: [request.toArg()]
    }
  });
} else {
  ellipsis.noResponse();
}
}
