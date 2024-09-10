const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { analyze } = require("./analyze.js");

//using cors
app.use(cors());
// configure env files
dotenv.config();

port = 3000;

const key = process.env.API_KEY;
//read the json files coming to you
app.use(express.json());
app.use(express.static('dist'))

app.get("/", (req, res) => {
  res.render("index.html")
});

app.post("/", async (req, res) => {
  const url = req.body.url;
  console.log(`Received URL: ${url}`);
  const Analyze = await analyze(url, key);
  const {code, msg, sample} = Analyze
  //send errors if result was wrong
  if (code == 212) {
      return res.send({ msg: msg , code: code})
  }
  else if (code == 100) {
      return res.send({ msg: msg, code: code })
  }

  return res.send({sample: sample, code: code})

})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
