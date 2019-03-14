function(ellipsis) {
  ellipsis.success("", {
  next: {
    actionName: "newRequest",
    args: [
      { name: "description", value: ellipsis.event.message ? ellipsis.event.message.text }
    ]
  }
});
}
