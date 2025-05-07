const mangoose = require("mongoose");

const ContactSchema = mangoose.Schema({
  name: String,
  email: String,
  message: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mangoose.model("Contact", ContactSchema);
