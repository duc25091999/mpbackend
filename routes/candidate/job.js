const router = require("express").Router();
const job = require("../../controller/Job.controller")

router.get("/", job.get);
router.get("/:id", job.getById);
router.put("/register/:id",job.registerJob)

module.exports = router;