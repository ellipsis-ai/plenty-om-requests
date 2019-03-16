function(permalink, ellipsis) {
  const EllipsisApi = require('ellipsis-api');
const actionsApi = new EllipsisApi(ellipsis).actions;
const client = require('GoogleClient')(ellipsis);
const {google} = ellipsis.require('googleapis@36.0.0');
const sheets = google.sheets({
  version: 'v4', 
  auth: client
});
const Request = require("Request");
const moment = require("moment-timezone");
moment.tz.setDefault(ellipsis.teamInfo.timeZone);

const SAVE_ERROR_MESSAGE = "Unable to save to the Google Sheet. Please contact the admins.";

client.authorize().then(() => {
  return sheets.spreadsheets.values.get({
    spreadsheetId: ellipsis.env.OM_REQUEST_SHEET_ID,
    range: ellipsis.env.OM_REQUEST_SHEET_NAME,
    auth: client
  });
}).catch((err) => {
  throw new ellipsis.Error(err, {
    userMessage: SAVE_ERROR_MESSAGE
  });
}).then((res) => {
  const matchingIndex = res.data.values.findIndex(ea => ea[1] === permalink);
  if (matchingIndex >= 0) {
    const row = matchingIndex + 1;
    const column = Request.completedAtColumn();
    const range = `${ellipsis.env.OM_REQUEST_SHEET_NAME}!${column}${row}:${column}${row}`;
    const values = [[moment().format(Request.timestampFormat())]]
    return sheets.spreadsheets.values.update({
      spreadsheetId: ellipsis.env.OM_REQUEST_SHEET_ID,
      range: range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: values
      },
      auth: client
    }).then(res => {
      const updated = res.data.updatedRows;
      if (updated === 0) {
        throw new ellipsis.Error("Request was not saved. No rows were updated.", {
          userMessage: SAVE_ERROR_MESSAGE
        });
      } else {
        const sheetUrl = `https://docs.google.com/spreadsheets/d/${ellipsis.env.OM_REQUEST_SHEET_ID}/edit#gid=0`
        ellipsis.success(`OK. Saved to your [Google Sheet](${sheetUrl})`);
      }
    });
  } else {
    throw new ellipsis.Error("I couldn't find a request for this message", {
      userMessage: "I couldn't find a request for this message"
    });
  }
});
}
