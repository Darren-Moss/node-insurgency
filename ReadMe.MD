Author: Darren Moss
Feb 2019
=--------------------------------------------------------------------
The main purpose of this is not to merely host an Insurgency Sandstorm server, but to create a gaming environment for your community.

Two environment types or game modes available: Challenge and Progression

GAME MODES:
    Challenge:
        In this environment you control 3 servers, easy, hard  and a challenge server. Players can play on all 3
        You all know how hard the game can be, so try to categorise it into 2 difficulty levels. Easy and Hard.
        These will be the main servers keeping the community entertained.

        Then comes The Challenge, this is a 4 v 6 only match which in a lot of players minds is easy, so do it in a 'Best out of 3' against the clock.
        You and your team mates will be credited with all the glory and everyone playing everywhere in your community will hear about it.

        Game Mode: The Challenge
            Server requires x players to start.
            Once started, the team must win a best out of 3 on the map of their choice.

            If successful, you will enter the hall of fame.
            Server:
            Map:
            Time Taken:
            How it was Won:  (1,1)={aka: 'WhiteWash'} or (0,1,1)={aka: Payback} or {(1,0,1)={aka: Comeback}}
            Players:
                Mike - 4400
                Joe - 3875
                Jeff - 3790
                Daz - 20

    ... and the stories of legends will be told through the ages ... - Daz

    Progression:
        Players start at server 1 (easy) and have to achieve specivif requirements in order to qualify for the next.
        Players trying to connecty to a not yet qualified for server, will be kicked and notified of which server they qualify for.
        

All of this will be available for viewing on a custom web page dedicated to the community.
Info regarding community activity will be logged there.

'Sounds Cool', you say.
'But I dont know how to do all of the above!'
True, and even if it were that you did, imagine how long it will take you.

This is why I have started on this journey.
To bring all you game lovers, the ability to, at the click of a button, do all of the above almost instantaneously!
--------------------------------------------------------------
Uses: (all credit goes to the respective authors)
    flat-db
    rcon
    gamedig
    nodejs :)

Features:
    Monitors insurgency log files for events (map change, players connect/disconnect, rounds over, game over).
    Queries Game Servers for player stats (score)
    Monitors and Manages autonomously
    Records Game Sesions in a database
    Notification Service
    Kick Service


Known Issues:
    -server database logging empty players in 
    -session log incorrect at initial start before first player query
    -disconnected not reflected against players in session list
    -keeping disconnected players on session list makes no sense

Backlog:
    -writing player info to database
    -notifications
    -split code
    -web page 
    -web page displaying ranking
    -web page displaying active servers
    -web page displaying player list correclty
    -web page restart server button 
    -web page vote map change
    -installers -init file 
    -batch file
    -server management
    -server monitoring
    -admin management
    
Future:
Web:
    Leaderboards per server
    Current Server Status and Players Connected
    Notification messages

Auto Installers:
    SteamCMD
    Environment

Servers:
    Auto create Game Servers (eazy, challenge, hard)
    Manage Game Server states (stop, start, restart)
    Monitor Host Server (CPU,MEM,DISC,NET)

Config:
   Game Servers:
        ip,port,qryport,rconport,rconpass,servernames
        Server Prefix = [ZA] Daz's 
        Easy Server Name = Keep Calm
        Challenge Server = It's Time
        Hard Server = Mission Impossible
    Installations:
        SteamCMD Folder
        Game Server Folder/s
        Script Folder







    

# node-insurgency
