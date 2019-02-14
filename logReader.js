const FlatDB = require('flat-db');

// configure path to storage dir
FlatDB.configure({
  dir: './insurgency'
});
// since now, everything will be saved under ./storage

// create Movie collection with schema
let PlayerMaster = new FlatDB.Collection('playermaster', {
  steamid: '',
  name: '',
  rank: 0,
  points: 0,
  lastseen: 0,
  haslevel1wins: 0,
  haslevel1points: 0,
  haslevel2wins: 0,
  haslevel2points: 0,
  haslevel2mvp: 0
});

var fs = require('fs'),
  bite_size = 256,
  readbytes = 0,
  file = 0;

fs.open('\\\\192.168.1.228\\steam\\Insurgency_Sandstorm_Hard\\Insurgency\\Saved\\Logs\\Insurgency.log', 'r', function (err, fd) { file = fd; readsome(); });

function readsome() {
  var stats = fs.fstatSync(file); // yes sometimes async does not make sense!
  if (stats.size < readbytes + 1) {
    //console.log('Hehe I am much faster than your writer..! I will sleep for a while, I deserve it!');
    setTimeout(readsome, 3000);
  }
  else {
    fs.read(file, new Buffer(bite_size), 0, bite_size, readbytes, processsome);
  }
}

var logline = '';
function processsome(err, bytecount, buff) {
  //console.log('Read', bytecount, 'and will process it now.');

  // Here we will process our incoming data:
  // Do whatever you need. Just be careful about not using beyond the bytecount in buff.

  //  console.log(buff.toString('utf-8', 0, bytecount));

  logline = buff.toString('utf-8', 0, bytecount);

  //log entries

  //player connect disconnect
  //LogEasyAntiCheatServer: [RegisterClient] Client:
  //LogEasyAntiCheatServer: [UnregisterClient] Client:
  // if (logline.includes('Daz')){
  //     console.log(`============== player connected ==========`);
  //     console.log(logline);
  // }
  console.log(logline);
  //round finish

  // So we continue reading from where we left:
  readbytes += bytecount;
  process.nextTick(readsome);
}