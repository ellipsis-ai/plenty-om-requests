function(requestData, ellipsis) {
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
const request = Request.fromString(requestData);
request.timestamp = moment().format(Request.timestampFormat());

const SAVE_ERROR_MESSAGE = "Unable to save to the Google Sheet. Please contact the admins.";

client.authorize().then(() => {
  return sheets.spreadsheets.values.append({
    spreadsheetId: ellipsis.env.OM_REQUEST_SHEET_ID,
    range: ellipsis.env.OM_REQUEST_SHEET_NAME,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [request.toRow()]
    },
    auth: client
  });
}).catch((err) => {
  throw new ellipsis.Error(err, {
    userMessage: SAVE_ERROR_MESSAGE
  });
}).then((res) => {
  const updated = res.data.updates.updatedRows;
  if (updated === 0) {
    throw new ellipsis.Error("Report was not saved. No rows were updated.", {
      userMessage: SAVE_ERROR_MESSAGE
    });
  } else {
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${ellipsis.env.OM_REQUEST_SHEET_ID}/edit#gid=0`
    ellipsis.success(`OK. Saved to your [Google Sheet](${sheetUrl})`);
  }
});
}
