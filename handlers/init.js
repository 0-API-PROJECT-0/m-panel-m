const { db } = require('../handlers/db.js');
const config = require('../config.json');
const { v4: uuidv4 } = require('uuid');
const CatLoggr = require('cat-loggr');
const log = new CatLoggr();

async function init() {
    const ApiCloud = await db.get('ApiCloud_instance');
    if (!ApiCloud) {
        log.init('this is probably your first time starting ApiCloud, welcome!');
        log.init('you can find documentation for the panel at undefined');

        let imageCheck = await db.get('images');
        if (!imageCheck) {
            log.error('before starting ApiCloud for the first time, you didn\'t run the seed command!');
            log.error('please run: npm run seed');
            log.error('if you didn\'t do it already, make a user for yourself: npm run createUser');
            process.exit();
        }

        let ApiCloudID = uuidv4();
        let setupTime = Date.now();
        
        let info = {
            ApiCloudID: ApiCloudID,
            setupTime: setupTime,
            originalVersion: config.version
        }

        await db.set('ApiCloud_instance', info)
        log.info('initialized ApiCloud panel with id: ' + ApiCloudID)
    }        

    log.info('init complete!')
}

module.exports = { init }