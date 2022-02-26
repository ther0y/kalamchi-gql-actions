var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
const GQL_ENDPOINT =
  process.env.GQL_ENDPOINT || "http://localhost:8080/v1/graphql";

const HASURA_OPERATION = `
mutation($word: String, $date: timestamp, $round: Int, $guess_count: Int) {
  insert_games_one(object: {
    word: $word
    date: $date
    round: $round
    guess_count: $guess_count
  }) {
    id
  } 
}
`;

// execute the parent operation in Hasura
const execute = async (variables) => {
  const fetchResponse = await fetch(GQL_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      query: HASURA_OPERATION,
      variables,
    }),
    headers: {
      "x-hasura-admin-secret": process.env["HASURA_GRAPHQL_ADMIN_SECRET"] || "",
    },
  });
  const data = await fetchResponse.json();
  console.log("DEBUG: ", data);
  return data;
};

// Request Handler
router.post("/", async (req, res) => {
  // get request input
  const { word, date, round, guess_count } = req.body.input;

  // run some business logic

  // execute the Hasura operation
  const { data, errors } = await execute({
    word,
    date,
    round,
    guess_count,
  });

  // if Hasura operation errors, then throw error
  if (errors) {
    return res.status(400).json(errors[0]);
  }

  // success
  return res.json({
    ...data.insert_games_one,
  });
});

module.exports = router;
