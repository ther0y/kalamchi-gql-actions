const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(authorizationMiddleware);

// authorize action call
function authorizationMiddleware(req, res, next) {
  if (correctSecretProvided(req)) next();
  else res.sendStatus(403);
}

// check if the secret sent in the header equals to the secret stored as an env variable
function correctSecretProvided(req) {
  const requiredSecret = process.env.ACTION_SECRET_ENV;
  const providedSecret = req.headers["action_secret"];

  return requiredSecret === providedSecret;
}

app.use("/addNewGame", require("./handlers/addNewGame.js"));

app.post("/hello", async (req, res) => {
  return res.json({
    hello: "world",
  });
});

app.listen(PORT);
