const { db } = require('../handlers/db.js');
const config = require('../config.json');
const { v4: uuidv4 } = require('uuid');
const CatLoggr = require('cat-loggr');
const log = new CatLoggr();

async function init() {
    const API-CLOUD = await db.get('API CLOUD_instance');
    if (!API-CLOUD) {
        log.init('this is probably your first time starting API CLOUD, welcome!');
        log.init('you can find documentation for the panel at undefined');

        let imageCheck = await db.get('images');
        if (!imageCheck) {
            log.error('before starting API CLOUD for the first time, you didn\'t run the seed command!');
            log.error('please run: npm run seed');
            log.error('if you didn\'t do it already, make a user for yourself: npm run createUser');
            process.exit();
        }

        let API-CLOUDID = uuidv4();
        let setupTime = Date.now();
        
        let info = {
            API-CLOUDID: API-CLOUDID,
            setupTime: setupTime,
            originalVersion: config.version
        }

        await db.set('API CLOUD_instance', info)
        log.info('initialized API CLOUD panel with id: ' + API-CLOUDID)
    }        

    log.info('init complete!')
}

module.exports = { init }