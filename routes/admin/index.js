const router = require("express").Router();
const candidate = require('./candidate')
const mpcandidate = require('./mpcandidate')
const job = require('./job')
const user = require("../../controller/User.controller")

router.post("/register", user.create);
router.use('/candidate',candidate)
router.use('/mp',mpcandidate)
router.use('/job',job)

module.exports = router;
