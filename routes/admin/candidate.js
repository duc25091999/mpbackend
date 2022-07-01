const router = require("express").Router();
const candidate = require("../../controller/Candidate.controller")

router.get("/", candidate.get);
router.get("/:id", candidate.getById);
router.post("/create", candidate.create);
router.delete("/delete/:id",candidate.delete);
router.put("/update/:id",candidate.update);


module.exports = router;