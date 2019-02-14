config = require('./config');
const PlayerParse = require('./parser');
const Rcon = require('rcon');
const Logger = require('./logger');
const GameSession = require('./session');
Tail = require('tail').Tail;
const EventEmitter = require('events');

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

//Register Listeners
logger.on(`playerConnected`, (data) => {
  if (debug) {
    console.log('=======Player Connected');
    console.log(data);
  }

  var mydata = data.toString().split(':');
  if (debug) {
    console.log(mydata);
  }
  name = mydata[7].toString().replace(' ', '');
  steamid = mydata[6].split(' ')[1];
  if (debug) {
    console.log(name, steamid);
  }

  if (!session.playerExists(name)) {
    session.addPlayer(name, steamid);
    if (debug) {
      console.log(`player added `, name, steamid);
    }
  }
  else {
    if (debug) {
      console.log(`player exists `);
    }
  }
  if (debug) {
    console.log(`all players: `, session.players);
  }
}); //end on player connected

logger.on(`playerDisconnected`, (data) => {
  if (debug) {
    console.log('Player Disconnected');
    console.log(data);
    console.log(data.split(' ')[6]);
    var gid = data.split(' ')[6];
  }
  if (session.playerExists(session.findPlayer(gid))) {
    if (debug) {
      console.log('Player found');
    }
    session.removePlayer(session.findPlayer(gid));
  }
});

logger.on(`playerDropped`, (data) => {
  var playerid = data.split('x')[1].split(']')[0];
  if (debug) {
    console.log(`Dropping player`, playerid, `because of `, data);
    console.log(playerid);
  }
  if (session.playerExists(session.findPlayer(playerid))) {
    if (debug) {
      console.log('Player found');
    }
    session.removePlayer(session.findPlayer(data.split(' ')[5]));
  }
});

logger.on(`serverInfo`, (data) => {
  session.server = (data.split(':')[9].split('\t')[0].replace(' ', ''));
  let updating = ServerLog.update(key, {
    Server: session.server
  });
  console.log('\nupdating result:');
  console.log(updating);
});

logger.on(`mapChanged`, (data) => {
  var currmap = session.map;
  if (data.includes('LogScenario: Display: Successfully loaded scenario')) {
    //console.log(Map Info');
    session.map = data.split('\'')[1];
    //console.log(session.map);
    if (debug) {
      console.log(`Map: `, session.map);
    }
    let updating = ServerLog.update(key, {
      Map: session.map
    });
    console.log('\nupdating result:');
    console.log(updating);

  }
  else {
    //console.log(Map Info');
    session.map = data.split(':')[3];
    //console.log(session.map);
    if (debug) {
      console.log(`Map: `, session.map);
    }
  }

  if (currmap != session.map) {
    if (debug) {
      console.log('new map detected');
    }
  }
});

logger.on(`roundStart`, (data) => {
  if (debug) {
    console.log('=======Round Start');
  }

});

logger.on(`roundEnd`, (data) => {
  if (debug) {
    console.log('=======Round Over');
    console.log(data.split(':')[4].split(' ')[2]);
  }
  var winningTeam = data.split(':')[4].split(' ')[2];
  if (debug) {
    console.log(session.map);
  }
  if (session.map != null) {
    if ((session.map.includes('Security') && winningTeam == 0) || (session.map.includes('Insurgent') && winningTeam == 1)) {
      session.wins += 1;
      if (debug) {
        console.log('win added  ');
      }
    }
    else {
      session.losses += 1;
      if (debug) {
        console.log('loss added  ');
      }
    }
  }
  else {
    if (debug) {
      console.log('No map data found')
    }
  }
  let updating = ServerLog.update(key, {
    Wins: session.wins,
    Losses: session.losses
  });
  console.log('\nupdating result:');
  console.log(updating);

  // // get item with given key
  let logitem = ServerLog.get(key);
  console.log(`\nget item by key ${key}:`);
  console.log(logitem);


});//round end

logger.on(`gameOver`, (data) => {

  console.log('==========================================Game Over==========================================================');
  console.log('==========================================Game Over==========================================================');
  console.log('==========================================Game Over==========================================================');
  console.log('==========================================Game Over==========================================================');
  console.log('==========================================Game Over==========================================================');

  printAll();

  // add a ServerLog to DB use this key in future. 
  //console.log(`old key:` ,key);
  let key = ServerLog.add({
    Server: '',
    Map: '',
    Wins: 0,
    Losses: 0
  });
  console.log(`new key:`, key);
  session = new GameSession();
  session.map = '';
  session.wins = 0;
  session.losses = 0;

});

////////////////////////////////
////////////////////////////////
//  Read Log File
////////////////////////////////
////////////////////////////////

var fileToTail = config.logfile;

var options = { separator: /[\r]{0,1}\n/, fromBeginning: true, fsWatchOptions: {}, follow: true, logger: console };
tail = new Tail(fileToTail, options);

var session = new GameSession();
var lastsession = new GameSession();

session.wins = 0;
session.losses = 0;

session.roundcount = 0;
tail.on("line", function (data) {
  lastsession = session;

  if (data.includes('LogStatistics: Display: Config: UId: NULL 	Secret: NULL 	Endpoint:')) {
    if ((session.server == null || session.server == '')) {
      if (debug) {
        console.log(`==========server line`, data);
      }
      logger.emit('serverInfo', data);
    }
  }
  if (data.includes('LogGameMode: ProcessServerTravel:') || data.includes('LogScenario: Display: Successfully loaded scenario')) {
    logger.emit('mapChanged', data);
  }

  if (data.includes('LogEasyAntiCheatServer: [UnregisterClient] Client:')) {
    logger.emit('playerDisconnected', data);
  }

  if (data.includes('LogOnline: Warning: STEAM (NWI): Player UNKNOWN')) {
    //logger.emit('playerDropped',data);
  }

  if (data.includes('LogEasyAntiCheatServer: [RegisterClient] Client:')) {
    logger.emit('playerConnected', data);
  }

  if (data.includes('LogGameMode: Display: Round Over:')) {
    logger.emit('roundEnd', data);
  }
  if (data.includes('LogGameMode: Display: State: PreRound -> RoundActive')) {
    logger.emit('roundStart', data);

  }
  if (data.includes('LogStatistics: Display: Game Statistics Debug: Game End ')) {
    logger.emit('gameOver', data);
  }
});//end line read of log file

tail.on("error", function (error) {
  console.log('ERROR: Reading Log File ', error);
});//end error on log file read

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