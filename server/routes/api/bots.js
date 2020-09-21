const router = require("express").Router();
const log = require("../../helpers/log");
const bot = require("../../models/bot");
const common = require("../../helpers/common");
const authMiddleware = require("../../middleware/auth");

router.use(authMiddleware);

router.get("/list", (req, res) => {
  bot.findAll()   
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
    // Create new bot
    let botCode = common.makeRandomString(6);
    bot.create({name: req.body.name, code: botCode})
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