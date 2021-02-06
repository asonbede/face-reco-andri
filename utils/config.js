require("dotenv").config();
// process.env.GOOGLE_APPLICATION_CREDENTIALS = 'C:\Users\hp\Downloads\vision-project-302500-b67aa319a0aa.json'


const PORT = process.env.PORT || 8081;
let MONGODB_URI = process.env.MONGODB_URI;
if (process.env.NODE_ENV === "test") {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  PORT,
};
