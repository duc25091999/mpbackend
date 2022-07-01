const router = require("express").Router();
const MPCandidate = require("../../controller/MPCandidate.controller")

router.get("/", MPCandidate.get);
router.get("/:id", MPCandidate.getById);
router.post("/create", MPCandidate.create);
router.delete("/delete/:id",MPCandidate.delete);
router.put("/update/:id",MPCandidate.update);

module.exports = router;