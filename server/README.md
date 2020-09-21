## About This
This is the back-end server for [guilded super bot](https://github.com/Osamu01/superbot).
This app runs independent of both the bot and client front-end (made in react).
This app will act simply as a REST API and websocket server.

## Code Conventions
JSDoc comments on all exported functions.

camelCase for all variable and function names. 

## Migrations
Any changes to the database will be tracked and applied via a migrations sytem. The ORM library we are using is called Sequelize.
Tables will be accessed through their respective models, a table's model should reflect any changes made via migrations.
To apply migrations you can run `npm migrations` or `npx sequelize-cli db:migrate`

More sequelize info available here:
  * [Manual / Guides](https://sequelize.org/master/)
  * [API Reference](https://sequelize.org/master/identifiers.html)
  * [Migrations QueryInterface](https://sequelize.org/master/manual/query-interface.html)
  * [Migrations Guide](https://sequelize.org/master/manual/migrations.html)
  * [Model Basics](https://sequelize.org/master/manual/model-basics.html)

## Running this
##### Options 1. NPM Scripts
`npm start` - Will apply pending migrations and start the app using `node`

`npm dev` - Will apply existing migrations and start the app using `nodemon`

#### Options 2. Manually
`node ./app.js` Will **not** apply pending migrations and will run using `node`

`nodemon ./app.js` Will **not** apply pending migrations and will run using `nodemon`
