function(description, ellipsis) {
  const moment = require('moment-timezone');
const Request = require("Request");

const request = new Request({
  description: description,
  requestedAt: moment().tz(ellipsis.team.timeZone)
});

ellipsis.success("", {
  next: {
    actionName: "saveRequest",
    args: [request.toArg()]
  }
});
}
