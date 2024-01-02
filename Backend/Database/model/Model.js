const mongoose = require("mongoose");

// Web Schema
const testSchema = new mongoose.Schema(
      {}
);

// mongoose.model('<collectionNameinDB>',<Schema>);
const Model = mongoose.model('test',testSchema);

module.exports = Model;