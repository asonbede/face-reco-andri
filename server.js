const config = require("./utils/config");
const express = require("express");
const bodyParser = require("body-parser");
//const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const User = require("./models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
//const loginRouter = require("express").Router();
const cors = require("cors");
//const knex = require("knex");
//const register = require("./controllers/register");
//const signin = require("./controllers/signin");
const profile = require("./controllers/handleProfile");
const imageCount = require("./controllers/imageCount");
const path = require("path");
var AWS = require("aws-sdk");
const { request } = require("http");

const configAws = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const client = new AWS.Rekognition();
// const params = {
//   image: {},
//   Atrributes: ["ALL"],
// };
// client.detectFaces(params, function name(err, response) {
//   if (err) {
//     console.log(err, err.stack);
//   } else {
//     console.log("detected faces for---");
//     response.FaceDetails;
//   }
// });

// const Clarifai = require("clarifai");
// const appCla = new Clarifai.App({
//   apiKey: "96a8e655db0741248b50a1c722aaec3c",
// });

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
//app.use(bodyParser.json());
app.use(cors());

// const db = knex({
//   client: "pg",
//   connection: {
//     connectionString: process.env.DATABASE_URL,

//     ssl: true,
//   },
// });

// mongoose.connect("mongodb://localhost:27017/faceDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

async function quickstart(req, res,request) {
  try {
      // Creates a client
      const client = new vision.ImageAnnotatorClient();

      // Performs text detection on the local file
      //const [result] = await client.textDetection(request);//"Scan_20210124 (6).png"
      const [result]=await client.documentTextDetection(request)
      const detections = result.textAnnotations;
      const [ text, ...others ] = detections
      console.log(`text: ${ text.description }`);
     // console.log(result.fullTextAnnotation);
    // console.log(result.fullTextAnnotation.text);
     //console.log(result.textAnnotations)
     //res.send(`Text: ${ text.description }`)
     res.status(200).json({text: `${ text.description }`} )
  } catch (error) {
      console.log(error)
  }

}

// const request = {
//   image: {
//     content: Buffer.from(img_base64, 'base64')
//   }
// };

// const [result] = await client.textDetection(request);
// console.log(result.textAnnotations);
// console.log(result.fullTextAnnotation);

mongoose.connect("mongodb://localhost:27017/faceDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
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
  //console.log("fromImageAddrsssss");
  const imageAddress = req.body.address;
  const typeOfOPeration = req.body.typeOfOPeration;
  const base64Image = imageAddress.split(";base64,").pop();
  const buf = Buffer.from(base64Image, "base64");

  const request = {
  image: {
    content: buf
  }
};

 // console.log({ imageAddress });

  //<option value="photo-faces">Detect Faces In Photos </option>
  // <option value="photo-objects">Detect Objects In Photos </option>
  // <option value="webcam-faces">Detect Faces In Webcam</option>
  // <option value="webcam-objects">Detect Objects In Webcam </option>

  //console.log({ buf });
  if (typeOfOPeration === "photo-faces" || typeOfOPeration === "webcam-faces") {
    const params = {
      Image: {
        Bytes: buf,
      },
      Attributes: ["ALL"],
    };
    client.detectFaces(params, function name(err, response) {
      if (err) {
        console.log(err, err.stack);
        res.status(400).json("unable to work with API");
      } else {
        console.log("detected faces for---");
        //console.log("faceses seen", response.FaceDetails);
        res.status(200).json(response.FaceDetails);
      }
    });
  } else if (
    typeOfOPeration === "photo-objects" ||
    typeOfOPeration === "webcam-objects"
  ) {
    const params = {
      Image: {
        Bytes: buf,
      },
      MaxLabels: 10,
      MinConfidence: 75,
    };

    client.detectLabels(params, function (err, response) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        res.status(400).json("unable to work with API");
      } else {
        console.log(`Detected labels for`);

       // console.log("labels seen", response.Labels);
        res.status(200).json(response.Labels);
      }
    });
  }else if (typeOfOPeration=== "text-in-image") {
    quickstart(req, res,request)
    
  }

  // appCla.models
  //   .predict(Clarifai.FACE_DETECT_MODEL, imageAddress)
  //   .then((data) => {
  //     res.json(data);
  //   })
  //   .catch((err) => res.status(400).json("unable to work with API"));
});
// app.post("/signin", (req, res) => {
//   signin.handleSignin(req, res, db, bcrypt);
// });

// app.post("/register", (req, res) => {
//   console.log("from register-server2");
//   register.handleRegister(req, res, db, bcrypt);
// });

// app.post("/register", (req, res) => {
//   const { email, name, password } = req.body;
//   const hash = bcrypt.hashSync(password);
//   db.transaction((trx) => {
//     trx
//       .insert({
//         hash: hash,
//         email: email,
//       })
//       .into("login")
//       .returning("email")
//       .then((loginEmail) => {
//         return trx("users")
//           .returning("*")
//           .insert({
//             email: loginEmail[0],
//             name: name,
//             joined: new Date(),
//           })
//           .then((user) => {
//             res.json(user[0]);
//           });
//       })
//       .then(trx.commit)
//       .catch(trx.rollback);
//   }).catch((err) => res.status(400).json("unable to register"));
// });

//returns all the users in the database
app.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

app.post("/register", async (request, response) => {
  const body = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    email: body.email,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

app.put("/image", (req, res) => {
  imageCount.handleImageCount(req, res, User);
});

app.get("/profile/:id", (req, res) => {
  console.log("from profileget");
  profile.handleProfileGet(req, res);
});

//signin

app.post("/signin", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({ email: body.email });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid email or password",
    });
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response.status(200).send({
    token,
    email: user.email,
    name: user.name,
    _id: user._id,
    entries: user.entries,
  });
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
