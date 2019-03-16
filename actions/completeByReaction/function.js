function(ellipsis) {
  const checkContext = require('checkContext');

const msg = ellipsis.event.message;
if (checkContext(ellipsis) && msg) {
  ellipsis.success(`Completing request for \`${msg.text}\`…`, {
    next: {
      actionName: "completeRequest",
      args: [
        { name: "permalink", value: msg.permalink || "" }
      ]
    }
  });
} else {
  ellipsis.noResponse();
}
}
