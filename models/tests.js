const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
});

testSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
