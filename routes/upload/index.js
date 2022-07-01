const router = require("express").Router();

const upload = require('./upload')

router.use('/',upload)

module.exports = router;
