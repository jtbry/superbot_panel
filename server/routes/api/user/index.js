const router = require("express").Router();

router.post("/login", (req, res) => {
    console.log(req.body);
    res.sendStatus(200).end();
});

router.get("/me", (req, res) => {
    res.sendStatus(200).end();
});

module.exports = router;