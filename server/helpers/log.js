const chalk = require("chalk");

/**
 * Send a colored message to log for info
 * 
 * @param {string} prefix Prefix to message
 * @param {string} string Message to output
 */
function Info(prefix, message) {
    console.log(`${chalk.gray(`[INFO] ${prefix} |`)} ${message}`);
}

/**
 * Send a colored message to log for warning
 * 
 * @param {string} prefix Prefix to message
 * @param {string} string Message to output
 */
function Warn(prefix, message) {
    console.log(`${chalk.yellow(`[WARN] ${prefix} |`)} ${message}`);
}

/**
 * Send a colored message to log for error
 * 
 * @param {string} prefix Prefix to message
 * @param {string} string Message to output
 */
function Error(prefix, message, error) {
    console.log(`${chalk.red(`[ERROR] ${prefix} |`)} ${message}`);
    if(error) {
        console.log(`   ${error}`);
    }
}

/**
 * Send a colored message to log for error then close process.
 * 
 * @param {string} prefix Prefix to message
 * @param {string} string Message to output
 */
function Fatal(prefix, message, error) {
    console.log(`${chalk.redBright(`[FATAL] ${prefix} |`)} ${message}`);
    if(error) {
        console.log(`   ${error}`);
    }
    process.exit(-1);
}

module.exports = {
    Info,
    Warn,
    Error,
    Fatal
}