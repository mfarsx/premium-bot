const processEnv = {};
require("dotenv").config({ path: "./config/.env", processEnv });

module.exports = processEnv;
