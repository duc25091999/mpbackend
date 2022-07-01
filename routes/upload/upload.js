const router = require("express").Router();
const UploadController = require("../../controller/Upload.controller");
const upload = require("../../index");
// const {isPdf} = require("../../verifyToken");
router.post("/upload",  upload.single("file"), UploadController.upload);
router.get("/files/:filename", UploadController.getFile);
router.delete("/files/:id", UploadController.deleteFile);

module.exports = router;
