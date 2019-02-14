// LOG FILE CONFIG
//easy
const easyFile = "\\\\192.168.1.228\\steam\\Insurgency_Sandstorm_Easy\\Insurgency\\Saved\\Logs\\Insurgency.log";
//medium
const mediumFile = "\\\\192.168.1.228\\steam\\Insurgency_Sandstorm_Medium\\Insurgency\\Saved\\Logs\\Insurgency.log";
//hard
const hardFile = "\\\\192.168.1.228\\steam\\Insurgency_Sandstorm_Hard\\Insurgency\\Saved\\Logs\\Insurgency.log";
//Dev
const devFile = "E:\\SteamCmd\\Servers\\insurgency_sandstorm\\Insurgency\\Saved\\Logs\\Insurgency.log";

const logfile = hardFile;
module.exports.logfile = logfile;


//RCON CONFIG
const host = '102.141.179.160'
//const host = '127.0.0.1'
const pass = 'PassDaz'
const hardQry = 27015;
const mediumQry = 27013;
const easyQry = 27011;

const qryPort = hardQry;


module.exports.host = host;
module.exports.pass = pass;
module.exports.qryPort = qryPort;