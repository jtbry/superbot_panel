const router = require("express").Router();

router.use("/osrs-plugin", require("./osrs"));
router.use("/user", require("./user"));
router.use("/bots", require("./bots"));

module.exports = router;