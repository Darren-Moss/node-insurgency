const EventEmitter = require('events');
const Logger = require('./logger');

const logger = new Logger();



logger.on(`playerConnected`, () => {

    console.log('===============================NOTIFICATION==========================');
    console.log('===============================PLAYER CONNECTED==========================');
})
