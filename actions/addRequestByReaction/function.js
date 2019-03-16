function(ellipsis) {
  const checkContext = require('checkContext');

const msg = ellipsis.event.message;
if (checkContext(ellipsis) && msg) {
  ellipsis.success(`Adding a new request for \`${msg.text}\`…`, {
    next: {
      actionName: "newRequest",
      args: [
        { name: "description", value: msg.text },
        { name: "permalink", value: msg.permalink || "" }
      ]
    }
  });
} else {
  ellipsis.noResponse();
}
}
