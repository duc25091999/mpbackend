const router = require("express").Router();
const candidate = require("../../controller/Candidate.controller")
const MPCandidate = require("../../controller/MPCandidate.controller")

router.post("/create", candidate.create);
router.post("/mp/create",MPCandidate.create)

module.exports = router;