const EventEmitter = require('events');

var url = 'http://logger.io/log';

class Logger extends EventEmitter {
    log(message) {
        //send an http message
        console.log(message);

        //raise an event
        this.emit('eventOccurred', { id: 1, txt: 'event text' });
    }
}



module.exports = Logger;
//module.exports.endpoint = url;

