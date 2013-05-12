
var user = {
  name: 'btford',
  password: 'unicorns4eva'
};

var tokens = {};

var makeRandomToken = function () {
  var token;
  do {
    token = '';
    while (token.length < 36) {
      token += Math.round(36*Math.random()).toString(36);
    }
  } while (tokens[token]);

  return token;
};

exports.get = function (req, res) {
  res.json({
    loggedIn: tokens[req.body.token]
  });
};

exports.post = function (req, res) {
  // set login status
  var loggedIn = req.body.name === user.name &&
    req.body.password === user.password;

  if (loggedIn) {
    var token = makeRandomToken();
    tokens[token] = true;
  }

  // return new status
  res.json({
    loggedIn: loggedIn
  });
};

exports.delete = function (req, res) {
  // set login status
  loggedIn = false;

  res.json({
    loggedIn: loggedIn
  });
};
