const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/handleProfile");
const imageCount = require("./controllers/imageCount");
const path = require("path");
const Clarifai = require("clarifai");
const appCla = new Clarifai.App({
  apiKey: "96a8e655db0741248b50a1c722aaec3c",
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,

    ssl: true,
  },
});

// const db = knex({
//   client: "pg",
//   connection: {
//     host: "127.0.0.1",
//     user: "postgres",
//     password: "12345",
//     database: "smartbraindb",
//   },
// });
app.post("/imageaddress", (req, res) => {
  console.log(req.params);
  console.log("fromImageAddrsssss");
  const imageAddress = req.body.address;
  console.log({ imageAddress });
  appCla.models
    .predict(Clarifai.FACE_DETECT_MODEL, imageAddress)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
});
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  console.log("from register-server2");
  register.handleRegister(req, res, db, bcrypt);
});

app.put("/image", (req, res) => {
  imageCount.handleImageCount(req, res, db);
});

app.get("/profile/:id", (req, res) => {
  console.log("from profileget");
  profile.handleProfileGet(req, res, db);
});

//deployment setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("listening at port 3001"));
