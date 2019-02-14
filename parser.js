var events = require('events'), util = require('util');
var debug = false;

function PlayerParse(name, ip, steamid, score) {
    if (!(this instanceof PlayerParse)) return new PlayerParse(name, ip, steamid, score);

    this.name = name;
    this.ip = ip;
    this.steamid = steamid;
    this.score = score;

    events.EventEmitter.call(this);
}; //end func
util.inherits(PlayerParse, events.EventEmitter);

PlayerParse.prototype.parse = function (str) {
    var split = str.split('|');
    for (a = 0; a < split.length; a++) {
        if (debug)
            console.log(a, split[a]);
    };

    if (debug) {
        console.log(split.length);
    }

    for (var i = 0; i < split.length; i++) {
        if (i < 3)
            continue;
        if (i == 3) {
            var a = split[i].split('\n');
            this.id = a[2];
            if (debug) {
                console.log(`id `, this.id);
                console.log(`original `, split[i]);
            }
            continue;
        };
        if ((i + 2) % 5 == 0) {
            this.id = split[i];
            b = this.id.split('\t');
            this.id = b[0].replace(' ', '');
            if (debug) {
                console.log(`id `, this.id);
                console.log(`original `, split[i]);
            }
            continue;
        }
        if ((i + 1) % 5 == 0) {
            this.name = split[i];
            b = this.name.split('\t');
            this.name = b[0].replace(' ', '');
            if (debug) {
                console.log(`name `, this.name);
                console.log(`original `, split[i]);
            }
            continue;
        }
        if (i % 5 == 0) {
            this.steamid = split[i];
            b = this.steamid.split('\t');
            this.steamid = b[0].replace(' ', '');
            if (debug) {
                console.log(`steamid `, this.steamid);
                console.log(`original `, split[i]);
            }
            continue;
        }
        if ((i - 1) % 5 == 0) {
            this.ip = split[i];
            b = this.ip.split('\t');
            this.ip = b[0].replace(' ', '');
            if (debug) {
                console.log(`ip `, this.ip);
                console.log(`original `, split[i]);
            }
            continue;
        }
        if ((i - 2) % 5 == 0) {
            this.score = split[i];
            b = this.score.split('\t');
            this.score = b[0].replace(' ', '');
            if (debug) {
                console.log(`score `, this.score);
                console.log(`original `, split[i]);
            }

            //last data item reached so return the results
            if (debug)
                console.log(this.name, ` is under scrutinisation...`);
            if (['Suicide Bomber', 'Observer', 'Commander', 'Advisor', 'Marksman', 'Gunner', 'Breacher', 'Rifleman', 'Demolitions'].includes(this.name)) {
                if (debug)
                    console.log(this.name, ` is a BOT!!`);
                this.emit('parsedBot', this.name, '', '', this.score);
            }
            else {
                if (debug)
                    console.log(this.name, ` is Human`);
                this.emit('parsedPlayer', this.name, this.ip, this.steamid, this.score);
            }
        };
    };//main for split
};//player.parse  

module.exports = PlayerParse;