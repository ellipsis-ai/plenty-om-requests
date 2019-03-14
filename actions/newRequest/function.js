function(description, messageId, ellipsis) {
  const moment = require('moment-timezone');
const Request = require("Request");

const request = new Request({
  description: description,
  messageId: messageId,
  requestedAt: moment().tz(ellipsis.team.timeZone)
});

ellipsis.success("", {
  next: {
    actionName: "saveRequest",
    args: [request.toArg()]
  }
});
}
