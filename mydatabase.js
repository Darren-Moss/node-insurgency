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
