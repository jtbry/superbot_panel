const sqlite3 = require("sqlite3");
const db = new sqlite3.Database('./panel.db');

/**
 * Run a query on the database - sqlite3.Database.run
 * 
 * @param {string} query Query to run
 * @param {Array} params Parameters to pass to ? in query
 * @return {Promise} resolves on success rejects with error
 */
function run(query, params = []) {
    return new Promise((resolve, reject) => {
        db.run(query, params, (err) => {
            if(err) return reject(err);
            else return resolve();
        })
    });
}

/**
 * Return all rows matching a given query - sqlite3.Database.all
 * 
 * @param {string} query Query to run
 * @param {Array} params Parameters to pass to ? in query
 * @return {Promise} resolves with rows rejects with error
 */
function all(query, params = []) {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

/**
 * Return single row matching a given query - sqlite3.Database.get
 * 
 * @param {string} query Query to run
 * @param {Array} params Parameters to pass to ? in query
 * @return {Promise} resolves with rows rejects with error
 */
function get(query, params = []) {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if(err) reject(err);
            else resolve(row);
        });
    });
}

module.exports = {
    run,
    all,
    get
}