const router = require("express").Router();

router.use("/osrs-plugin", require("./osrs-plugin/index"))

module.exports = router;