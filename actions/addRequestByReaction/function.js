function(ellipsis) {
  const checkContext = require('checkContext');

const msg = ellipsis.event.message;
if (checkContext(ellipsis) && msg) {
  ellipsis.success("", {
    next: {
      actionName: "newRequest",
      args: [
        { name: "description", value: msg.text },
        { name: "messageId", value: msg.permalink || "" }
      ]
    }
  });
} else {
  ellipsis.noResponse();
}
}
