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
// since now, everything will be saved under ./storage

// create Movie collection with schema
let ServerLog = new ServerDB.Collection('ServerLog', {
  Server: '',
  Map: '',
  Wins: 0,
  Losses: 0
});



// DB INFO
// The schema is optional.
// But once it was defined, any new item come later
// will be compared with this schema's structure and data type


// // count collection size
let count = ServerLog.count();
console.log('\ncollection size:');
console.log(count);

// // get all item
let all = ServerLog.all();
console.log('\nall items:');
console.log(all);

    // // find items with imdb < 7.1
    // let results = ServerLog.find().lt('imdb', 7.1).run();
    // console.log('\nitems with imdb < 7.1:');
    // console.log(results);

    // // get 2 items since 2nd item (skip first item), which have "re" in the title
    // results = ServerLog.find().matches('title', /re/i).skip(1).limit(2).run();
    // console.log('\n2 items since 2nd item (skip first one), \n which have "re" in the title:');
    // console.log(results);


    // // find items with imdb > 6 and title contains "God"
    // results = ServerLog
    //             .find()
    //             .gt('imdb', 6)
    //             .matches('title', /God/)
    //             .run();
    // console.log('\nitems with imdb > 6 and title contains "God":');
    // console.log(results);

    // // remove all
    //ServerLog.reset();

    // // count collection size after removing all
    // count = ServerLog.count();
    // console.log('\ncollection size after removing all:');
    // console.log(count);

