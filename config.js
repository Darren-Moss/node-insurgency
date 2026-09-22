// Configuration is read from environment variables.
// Copy .env.example to .env and fill in your own values - .env is gitignored.
require('dotenv').config();

// Which server this process is attached to: easy | medium | hard | dev
const SERVER = (process.env.SERVER || 'hard').toLowerCase();

const SERVERS = {
    easy:   { qryPort: Number(process.env.PORT_EASY)   || 27011, logfile: process.env.LOG_EASY },
    medium: { qryPort: Number(process.env.PORT_MEDIUM) || 27013, logfile: process.env.LOG_MEDIUM },
    hard:   { qryPort: Number(process.env.PORT_HARD)   || 27015, logfile: process.env.LOG_HARD },
    dev:    { qryPort: Number(process.env.PORT_DEV)    || 27015, logfile: process.env.LOG_DEV },
};

const active = SERVERS[SERVER];
if (!active) {
    throw new Error(`Unknown SERVER "${SERVER}" - expected one of: ${Object.keys(SERVERS).join(', ')}`);
}

const host = process.env.RCON_HOST || '127.0.0.1';
const pass = process.env.RCON_PASS;

if (!pass) {
    console.warn('[config] RCON_PASS is not set - RCON authentication will fail. See .env.example');
}

module.exports.server  = SERVER;
module.exports.host    = host;
module.exports.pass    = pass;
module.exports.qryPort = active.qryPort;
module.exports.logfile = active.logfile;
