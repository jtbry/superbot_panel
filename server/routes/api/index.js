const router = require("express").Router();

router.use("/osrs-plugin", require("./osrs-plugin/index"));
router.use("/user", require("./user/index"));

module.exports = router;