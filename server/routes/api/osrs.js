const router = require("express").Router();

router.get("/", (req, res) => {
  // Default route
  res.end("Nothing here");
});

module.exports = router;