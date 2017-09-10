var SchemaObject = require('schema-object');

var User = new SchemaObject({
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  birthday: Date,
});

module.exports = User;
