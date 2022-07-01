const router = require("express").Router();

const candidate = require('./candidate')
const job = require('./job')

router.use('/candidate',candidate)
router.use('/job',job)

module.exports = router;
