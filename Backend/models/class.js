// // models/Class.js
// const mongoose = require("mongoose");

// const classSchema = new mongoose.Schema({
//   className:{ type: String, required: true, unique: true },
//   roomNumber:{ type: Number, required: true },
// });

// module.exports = mongoose.model("Class", classSchema);
const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  className: { type: String, required: true, unique: true },
  roomNumber: { type: Number, required: true },
});

module.exports = mongoose.model("Class", classSchema);
