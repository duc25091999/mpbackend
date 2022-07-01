const express = require("express");
const imageRouter = express.Router();
const mongoose = require("mongoose");
var Grid = require("gridfs-stream");
var ObjectId = require("mongodb").ObjectId;
require("dotenv").config();


const connection = mongoose.connection;

let gfs, gridfsBucket;

Grid.mongo = mongoose.mongo;

connection.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: "uploads",
  });
  // Init stream
  gfs = Grid(connection.db);
  gfs.collection("uploads");
});
module.exports = {
  upload: async (req, res, next) => {
    res.status(200).send({ success: true, message: req.file });
  },
  getFile: async (req, res) => {
    try {
      gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
          return res
            .status(200)
            .send({ success: false, message: "No file exists" });
        }
        if (file.contentType === "application/pdf") {
          const readstream = gridfsBucket.openDownloadStream(file._id);
          res.set("Content-Type", "application/pdf");
          res.set("Content-Disposition", "inline");
          readstream.pipe(res);
        }
        else if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
          // Read output to browser
          const readstream = gfs.createReadStream(file.filename);
          readstream.pipe(res);
        }
        else{
          res.status(200).send({ success: false, message: "file is not a pdf file" });
        }
      });
    } catch (err) {
      res.status(200).send({ success: false, message: err });
    }
  },
  deleteFile: async (req, res) => {
    try {
      gridfsBucket = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: "uploads",
      });
      gridfsBucket.delete(ObjectId(req.params.id));
      res.status(200).send({ success: true, message: "Upload successfully" });
    } catch (err) {
      res.status(200).send({ success: false, message: err });
    }
  },
};
