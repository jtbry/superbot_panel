/**
 * Routes relating to users
 */

const router = require("express").Router();
const db = require("../../helpers/database");

router.post("/login", (req, res) => {
    db.get("SELECT * FROM Users WHERE username = ? AND password = ?", [req.body.username, req.body.password])
        .then((user) => {
            if(user) {
                req.session.user = user;
                return res.sendStatus(200).end();

            } else {
                return res.sendStatus(403).end();
            }
        })
        .catch((err) => {
            console.log(err);
            return res.sendStatus(500).end();
        });
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    return res.sendStatus(200).end();
});

router.get("/me", (req, res) => {
    // TODO: Maybe set a JWT cookie too to allow persistent login (even if server restarts etc)
    if(req.session.user) {
        res.sendStatus(200).end();
    } else {
        res.sendStatus(403).end();
    }
});

module.exports = router;