const chalk = require("chalk");

/**
 * Send a colored message to log for info
 * 
 * @param {string} prefix Prefix to message
 * @param {string} string Message to output
 */
function info(prefix, message) {
  console.log(`${chalk.gray(`[INFO] ${prefix} |`)} ${message}`);
}

/**
 * Send a colored message to log for warning
 * 
 * @param {string} prefix Prefix to message
 * @param {string} string Message to output
 */
function warn(prefix, message) {
  console.log(`${chalk.yellow(`[WARN] ${prefix} |`)} ${message}`);
}

/**
 * Send a colored message to log for error
 * 
 * @param {string} prefix Prefix to message
 * @param {string} string Message to output
 * @param {Any} error Optional error to display
 */
function error(prefix, message, error) {
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
 * @param {Any} error Optional error to display
 */
function fatal(prefix, message, error) {
  console.log(`${chalk.redBright(`[FATAL] ${prefix} |`)} ${message}`);
  if(error) {
    console.log(`   ${error}`);
  }
  process.exit(-1);
}

module.exports = {
  info,
  warn,
  error,
  fatal
}