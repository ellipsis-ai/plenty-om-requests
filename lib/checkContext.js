/*
@exportId YLzrJQCxTIy-Hnwy1OPgbQ
*/
module.exports = (function() {
return ellipsis => {
  const correctUser = ellipsis.event.user.userIdForContext === ellipsis.env.OM_REQUEST_USER_ID;
  const correctChannel = ellipsis.event.message && ellipsis.event.message.channel.id === ellipsis.env.OM_REQUEST_CHANNEL;
  return correctUser && correctChannel;
}
})()
     