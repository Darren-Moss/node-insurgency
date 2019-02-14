// LOG FILE CONFIG
//easy
const easyFile = "\\\\SERVER_HOST\\steam\\Insurgency_Sandstorm_Easy\\Insurgency\\Saved\\Logs\\Insurgency.log";
//medium
const mediumFile = "\\\\SERVER_HOST\\steam\\Insurgency_Sandstorm_Medium\\Insurgency\\Saved\\Logs\\Insurgency.log";
//hard
const hardFile = "\\\\SERVER_HOST\\steam\\Insurgency_Sandstorm_Hard\\Insurgency\\Saved\\Logs\\Insurgency.log";
//Dev
const devFile = "E:\\SteamCmd\\Servers\\insurgency_sandstorm\\Insurgency\\Saved\\Logs\\Insurgency.log";

const logfile = hardFile;
module.exports.logfile = logfile;


//RCON CONFIG
const host = 'RCON_HOST'
//const host = '127.0.0.1'
const pass = 'CHANGEME'
const hardQry = 27015;
const mediumQry = 27013;
const easyQry = 27011;

const qryPort = hardQry;


module.exports.host = host;
module.exports.pass = pass;
module.exports.qryPort = qryPort;