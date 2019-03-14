function(description, ellipsis) {
  ellipsis.success("", {
  next: {
    actionName: "newRequest",
    args: [
      { name: "description", value: description }
    ]
  }
});
}
