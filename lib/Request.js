/*
@exportId fJQ_kO-bS72bkxmGqiq2jg
*/
module.exports = (function() {
class Request {
  constructor(data) {
    this.requestedAt = data.requestedAt;
    this.description = data.description;
    this.messageId = data.messageId;
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
      this.messageId || "",
      this.requestedAt
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
     