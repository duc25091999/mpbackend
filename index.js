const express = require("express");
const app = express();
var cors = require('cors')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const adminRoute = require("./routes/admin/index");
const candidateRoute = require("./routes/candidate/index");
const authRoute = require("./routes/auth/auth");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const crypto = require("crypto");
const path = require('path');
Grid.mongo = mongoose.mongo;
var cors = require("cors");
const { isValidToken, isUserExist, isAdmin } = require("./verifyToken");
// mongoose.set('useFindAndModify', false);
app.use(cors());
dotenv.config();
// conect to db
const PORT = process.env.PORT || 8080; // Step 1
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
var conn = mongoose.connection;
let gfs;
conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db);
  gfs.collection("uploads");
});

const storage = new GridFsStorage({
  db: conn ,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });
module.exports = upload;

const uploadRoute = require("./routes/upload/index");

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/.next/'));
}
//midleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api", uploadRoute);
app.use("/api/admin", isValidToken, isUserExist, isAdmin, adminRoute);
app.use("/api/user", candidateRoute);

app.listen(PORT, () => console.log(`Server is running ${PORT}`));

