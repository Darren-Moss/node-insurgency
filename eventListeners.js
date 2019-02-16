debug = false;

////////////////////////////////
////////////////////////////////
//  Event Listeners
////////////////////////////////
////////////////////////////////

GameSession = require('./session');

function processEvent(logger,session,serverlog,key) {
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
    let updating = serverlog.update(key, {
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
      let updating = serverlog.update(key, {
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
    let updating = serverlog.update(key, {
      Wins: session.wins,
      Losses: session.losses
    });
    console.log('\nupdating result:');
    console.log(updating);
  
    // // get item with given key
    let logitem = serverlog.get(key);
    console.log(`\nget item by key ${key}:`);
    console.log(logitem);
  
  
  });//round end
  
  logger.on(`gameOver`, (data) => {
  
    console.log('==========================================Game Over==========================================================');
    console.log('==========================================Game Over==========================================================');
    console.log('==========================================Game Over==========================================================');
    console.log('==========================================Game Over==========================================================');
    console.log('==========================================Game Over==========================================================');
  
    
    // add a ServerLog to DB use this key in future. 
    //console.log(`old key:` ,key);
    let key = serverlog.add({
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
    return session;
  });
  return session;
};

module.exports = processEvent;
  ////////////////////////////////
  ////////////////////////////////
  //  End of Event Listeners
  ////////////////////////////////
  ////////////////////////////////