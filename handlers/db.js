const Keyv = require('keyv');
const db = new Keyv('sqlite://ApiCloud.db');

module.exports = { db }