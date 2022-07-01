const router = require("express").Router();
const job = require("../../controller/Job.controller")

router.get("/", job.get);
router.get("/:id", job.getById);
router.post("/create", job.create);
router.delete("/delete/:id",job.delete);
router.put("/update/:id",job.update);
router.put("/register/:id",job.registerJob)

module.exports = router;