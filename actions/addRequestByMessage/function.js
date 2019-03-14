function(ellipsis) {
  const checkContext = require('checkContext');

if (checkContext(ellipsis)) {
  ellipsis.success("", {
    next: {
      actionName: "collectDescription"
    }
  });
} else {
  ellipsis.noResponse();
}
}
