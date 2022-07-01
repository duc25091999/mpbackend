const router = require("express").Router();
const user = require("../../controller/User.controller")

// router.post("/register", user.create);
router.post("/login", user.login);
router.post("/changePassword/:id", user.changePassword);

module.exports = router;