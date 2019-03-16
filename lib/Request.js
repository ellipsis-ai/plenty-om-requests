/*
@exportId fJQ_kO-bS72bkxmGqiq2jg
*/
module.exports = (function() {
const moment = require('moment-timezone');

class Request {
  constructor(data) {
    this.timeZone = data.timeZone;
    this.requestedAt = data.requestedAt;
    this.description = data.description;
    this.permalink = data.permalink;
    this.completedAt = data.completedAt
  }

  static completedAtColumn() {
    return 'D';
  }

  static fromString(jsonString) {
    return new Request(JSON.parse(jsonString));
  }

  static dateFormat() {
    return "M/D/YYYY";
  }

  static timestampFormat() {
    return "MMMM D, YYYY h:mm:ss a";
  }

  toRow() {
    return [
      this.description,
      this.permalink || "",
      moment(this.requestedAt).tz(this.timeZone).format(Request.timestampFormat())
    ];
  }

  toString() {
    return JSON.stringify(this);
  }

  toArg() {
    return {
      name: "requestData",
      value: this.toString()
    }
  }
}

return Request;

})()
     