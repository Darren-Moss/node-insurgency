const Rcon = require('./node_modules/rcon/node-rcon');
const PlayerParse = require('./parser');

const host = '102.141.179.160'
//const host = '127.0.0.1'
const pass = 'PassDaz'
const hard = 27015;
const medium = 27013;
const easy = 27011;

const rcon = new Rcon(host, 27011, pass);
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





