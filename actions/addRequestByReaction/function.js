function(ellipsis) {
  const checkContext = require('checkContext');

if (checkContext(ellipsis)) {
  ellipsis.success("", {
    next: {
      actionName: "newRequest",
      args: [
        { name: "description", value: ellipsis.event.message ? ellipsis.event.message.text }
      ]
    }
  });
} else {
  ellipsis.noResponse();
}
}
