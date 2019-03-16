function(description, permalink, ellipsis) {
  const moment = require('moment-timezone');
const Request = require("Request");

const request = new Request({
  timeZone: ellipsis.team.timeZone,
  description: description,
  permalink: permalink,
  requestedAt: moment().tz(ellipsis.team.timeZone)
});

ellipsis.success("", {
  next: {
    actionName: "saveRequest",
    args: [request.toArg()]
  }
});
}
