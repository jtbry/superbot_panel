/**
 * Routes relating to bots from the dashboard
 */
const router = require("express").Router();
const log = require("../../helpers/log");
const db = require("../../helpers/database");
const common = require("../../helpers/common");
const authMiddleware = require("../../middleware/auth");

router.use(authMiddleware);

router.get("/list", (req, res) => {
    db.all("SELECT * FROM Bots", [])
        .then((rows) => {
            res.send(JSON.stringify(rows)).end();
        })
        .catch((err) => {
            res.sendStatus(500).end();
            log.Error("BotsApi", "Error getting bot list", err);
        });
});

router.post("/create", (req, res) => {
    if(!req.body.name) {
        res.sendStatus(422).end();
    } else {
        if(req.body.name.length <= 3) {
            return res.sendStatus(422).end();
        }
        // Generate code
        let botCode = common.makeRandomString(6);
        db.run("INSERT INTO Bots(name, code) VALUES(?, ?)", [req.body.name, botCode])
            .then(() => {
                res.send(botCode).end();
            })
            .catch((err) => {
                res.sendStatus(500).end();
                log.Error("BotsApi", "Error creating bot code", err);
            });
    }
});

module.exports = router;