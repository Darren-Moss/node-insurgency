var debug = false;

////////////////////////////////
////////////////////////////////
//  Read Log File
////////////////////////////////
////////////////////////////////
function readLog(logger,session) {
  Tail = require('tail').Tail;
var fileToTail = config.logfile;

var options = { separator: /[\r]{0,1}\n/, fromBeginning: true, fsWatchOptions: {}, follow: true, logger: console };
tail = new Tail(fileToTail, options);

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


////////////////////////////////
////////////////////////////////
//  Read Log File
////////////////////////////////
////////////////////////////////
}

module.exports = readLog;