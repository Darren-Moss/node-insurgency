//define why this app exists
const Rcon = require('rcon');
const PlayerParse = require('./parser');
const config = require('./config');

const rcon = new Rcon(config.host, config.qryPort, config.pass);
const playerparser = new PlayerParse('', '', '', '');

playerparser.on('parsedPlayer', (name, ip, steamid, score) => {
    console.log('Player parsed');
    console.log(`name `, name);
    console.log(`IP `, ip);
    console.log(`steamid `, steamid);
    console.log(`score `, score);
    console.log('===============================');
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
    console.log(`res `, str);
    playerparser.parse(str);
    rcon.disconnect()
    return;
}).on('end', () => {
    console.log('end')
    console.log("Socket closed!");
    process.exit();
});

//console.log('connecting'); 
rcon.connect();





