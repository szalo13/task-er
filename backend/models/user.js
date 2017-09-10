var SchemaObject = require('schema-object');

var User = new SchemaObject({
  nickname: String,
  email: String,
  firstName: String,
  lastName: String,
  birthDate: Date,
});

module.exports = User;
