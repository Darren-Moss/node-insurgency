var debug = false;

Player = require('./Player');

function Session() {
  this.id = '';
  this.server = '';
  this.map = '';
  this.players = [];
  this.wins = 0;
  this.losses = 0;


  this.addPlayer = function (name, steamid, score, ip) {
    var p = new Player(name, steamid, score, ip); // here we create instance
    this.players.push(p);
  };


  this.updatePlayer = function (name, steamid, ip, score) {
    if (debug) {
      console.log(`updating player`, name, steamid, ip, score);
    }
    for (p = 0; p < this.players.length; p++) {
      if (this.players[p].name == name) {

        this.players[p].score = score;
        this.players[p].ip = ip;
        this.players[p].steamid = steamid;
      }
    }
    if (debug) {
      console.log(`updated player`, name, steamid, ip, score);
    }
  }


  this.removePlayer = function (name) {
    var newarr = [];
    if (debug) {
      console.log(`removing player`, name, ` from: `, this.players);
    }

    for (a = 0; a < this.players.length; a++) {

      let string = JSON.stringify(this.players[a]);
      if (debug) {
        console.log(`JSON string `, string);
      }
      var pname = JSON.parse(string).name;
      if (debug) {
        console.log(`JSON name`, pname);
      }

      if (pname == name) {
        continue;
      }
      newarr.push(this.players[a]);
    }

    if (debug) {
      console.log('===old===');
      console.log(this.players);
      console.log('===new===');
      console.log(newarr);
    }

    this.players = newarr;
  }

  this.listPlayers = function () {
    for (i = 0; i < this.players.length; i++) {
      if (debug) {
        console.log(this.players[i]);
      }
    }
    return this.players;
  }

  this.playerExists = function (name) {
    for (i = 0; i < this.players.length; i++) {
      if (debug) {
        console.log(`checking if player exists `, name, `against `, this.players[i].name);
      }
      if (name == ' ' || name == null || name == '') {
        if (debug) {
          console.log('null or empty');
        }
        return false;
      }

      if (this.players[i].name.toString() == name.toString()) {
        if (debug) {
          console.log('player found');
        }
        return true;
      };
    }
    if (debug) {
      console.log('cant find player');
    }
    return false;
  }

  this.findPlayer = function (id) {
    if (debug) {
      console.log(`============checking if id exists `, id);
      console.log(this.players);
    }
    for (i = 0; i < this.players.length; i++) {
      if (debug) {
        console.log(`against `, this.players[i].steamid);
      }
      if (id == ' ' || id == null || id == '') {
        return '';
      }

      if (this.players[i].steamid == id) {
        return this.players[i].name;
      };
    }
    if (debug) {
      console.log('cant find id');
    }
    return false;
  }
};


module.exports = Session;
