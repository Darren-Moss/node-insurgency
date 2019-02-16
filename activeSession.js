
config = require('./config');
const PlayerParse = require('./parser');
const Rcon = require('rcon');
const Logger = require('./logger');
const GameSession = require('./session');
//Tail = require('tail').Tail;
const EventEmitter = require('events');
const LogReader = require('./logReader');
const MyEvents = require('./eventListeners');

var session = new GameSession();
const logger = new Logger();

var ServerDB = require('flat-db');

// configure path to storage dir
ServerDB.configure({
  dir: './database'
});

// create
let ServerLog = new ServerDB.Collection('ServerLog', {
  Server: '',
  Map: '',
  Wins: 0,
  Losses: 0
});

// add a ServerLog to DB use this key in future. 
let key = ServerLog.add({
  Server: '',
  Map: '',
  Wins: 0,
  Losses: 0
});

// create
let PlayerLog = new ServerDB.Collection('PlayerLog', {
  Server: '',
  Map: '',
  Wins: 0,
  Losses: 0
});

var debug = false;


myevent = new MyEvents(logger,session,ServerLog,key);

//read the log file
mylog = new LogReader(logger,session);



function printAll() {
  console.log(`======================`);
  console.log(`Server: `, session.server);
  console.log(`Map: `, session.map);
  console.log(`Wins: `, session.wins);
  console.log(`Losses: `, session.losses);
  console.log(`Players: `, session.players);
  console.log(`======================`);
  console.log(`======================`);
  console.log(session);
  console.log(`======================`);
  console.log(`======================`);

}//end print all

function getSvrPlayers() {

  console.log('=== getting players from server ===')

  if (!rcon.hasAuthed) {
    console.log('connecting to RCON');
    rcon.connect();
  } else {
    console.log('RCON - get players');
    rcon.send('listplayers');
    console.log('=== END getting players from server ===');
  }
}//end getSvrPlayers

const rcon = new Rcon(config.host, config.qryPort, config.pass);
const playerparser = new PlayerParse('', '', '', '');

playerparser.on('parsedPlayer', (name, ip, steamid, score) => {
debug = true;
  if (debug) {
    printAll();
    console.log('Player parsed');
    console.log(`name `, name);
    console.log(`IP `, ip);
    console.log(`steamid `, steamid);
    console.log(`score `, score);
    console.log('===============================');
    printAll();
  };
  
  debug=false;
  
  if (session.playerExists(name)) {
    session.updatePlayer(name, steamid, ip, score);
  }
  else {
    session.addPlayer(name, steamid);
  }

}).on('parsedBot', (name, ip, steamid, score) => {
  // console.log('Bot parsed');    
  // console.log(`name `,name);
  // console.log(`score `,score);
  // console.log('===============================');    
})

rcon.on('auth', function () {
  //console.log("Authed!")
  //console.log('sending');
  rcon.send('listplayers');
}).on('response', (str) => {
  //console.log(`res `,str);
  playerparser.parse(str);
  return;
}).on('end', () => {
  console.log('end')
  console.log("Socket closed!");
});


setInterval(() => {
  if (debug) {
    console.log('Querying Server for Player Info');
  }
  getSvrPlayers();
  printAll();
}, 10000);

