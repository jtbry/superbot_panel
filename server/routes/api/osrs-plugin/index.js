const router = require("express").Router();

router.get("/", (req, res) => {
    // Default route at /api/osrs-plugin/
    res.end("Nothing here");
});

module.exports = router;