const router = require("express").Router();
const authMiddleware = require("../../middleware/auth");

router.use(authMiddleware);

router.get("/", (req, res) => {
    // Default route
    res.end("Nothing here");
});

module.exports = router;