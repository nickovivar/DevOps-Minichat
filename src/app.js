const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto');

const SECRET = "ethergaergareg";
const MAX_MESSAGES = 100;

const app = express();

function make_auth_token(username) {
    const hash = crypto.createHash('sha256');
    hash.update(`${username}${SECRET}`);
    return `${username}###${hash.digest('hex')}`;
}

function verify_auth_token(token) {
    const username = token.split("###")[0];
    const valid_token = make_auth_token(username);
    if (valid_token === token) {
      return username;
    } else {
      return null;
    }
}


var messages = [];
var users = {};

app.use(bodyParser.json())
app.post('/api/login',
  (req, res) => {
    const username = req.body.username;
    const token = make_auth_token(username);
    res.send({auth_token: token});
  }
)
app.get('/api/messages',
  (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = verify_auth_token(token);
    if (user === null) {
      return res.status(401).send("Not authenticated.");
    }
    res.send(messages)
  }
)
app.post('/api/messages',
  (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = verify_auth_token(token);
    if (user === null) {
      return res.status(401).send("Not authenticated.");
    }
    const message = req.body.message;
    if (typeof(message) !== "string") {
      return res.status(400).send("Invalid or no message provided.");
    }
    messages.unshift({sender: user, message});
    messages = messages.slice(0, MAX_MESSAGES);
    res.send([...messages].reverse());
  }
)

app.listen(3000, () => console.log('Example app listening on port 3000!'))
