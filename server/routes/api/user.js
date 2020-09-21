const router = require("express").Router();
const log = require("../../helpers/log");
const user = require("../../models/user");

router.post("/login", (req, res) => {
  user.findOne(
    {where: {username: req.body.username, password: req.body.password}}
  )
    .then((user) => {
      if(user) {
        req.session.user = user;
        return res.sendStatus(200).end();
      } else {
        return res.sendStatus(403).end();
      }
    })
    .catch((err) => {
      log.Error("UserApi", "Unable to login user", err);
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