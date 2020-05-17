const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
//var fs = require('fs'); 
import { appendFile } from 'fs';
const editJsonFile = require("edit-json-file");

//datadog
var StatsD = require('node-dogstatsd').StatsD;
var dogstatsd = new StatsD();

//Increment a counter.
//dogstatsd.increment('page.views');

var fsdateObj = new Date();
const illegalChannels = ["709130030164475907"]
var fsmonth;
var fsday;
var fsyear;

var finalfswrite;

var fsnewdate;

var illegalPrint;

let filejsonmsglog = editJsonFile(`${__dirname}/foo.json`);

var bruhserverlog;

var bruhserverid;

var bruhservername;

var msgnextlog;

function genHexString(len) {
  const hex = '0123456789abcdef';
  let output = '';
  for (let i = 0; i < len; ++i) {
      output += hex.charAt(Math.floor(Math.random() * hex.length));
  }
  return output;
}

var fshour;

let fsnewfilename = "bruh";

function bruhhasadate() {
  fsdateObj = new Date();
  fsmonth =fsdateObj.getUTCMonth() + 1; //months from 1-12
  fsday =fsdateObj.getUTCDate();
  fsyear =fsdateObj.getUTCFullYear();
  fshour = fsdateObj.getUTCHours();

  //console.log("Current time: "  + fsdateObj.getUTCHours() + ":" +fsdateObj.getUTCMinutes() + ":" +fsdateObj.getUTCSeconds());

  fsnewdate = fsyear + "-" + fsmonth + "-" + fsday;

  fsnewfilename = fsnewdate + "-" + fshour + "hr";

  return fsnewfilename;
}

function logFloorGangText(appendtxt) {
  
  bruhhasadate();

  finalfswrite =fsdateObj.getUTCHours() + ":" +fsdateObj.getUTCMinutes() + ":" +fsdateObj.getUTCSeconds()  + " - " + appendtxt + "\r\n";

  appendFile( "logs/" + fsnewdate + '.log.txt', finalfswrite, function (err) {
    if (err) return console.log(err);
    //console.log('Appended!');
 });
}

function logEventsJSON() {
  /*
  filejsonmsglog = editJsonFile(`${__dirname}/logs/` + bruhhasadate());

  let eventBruhId = genHexString("40")

  .set("planet", "Earth");
  */
}

client.on('ready', () => {
    console.log("Event Injest Tread Activated");
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
});

client.on('message', async msg => {
  //dogstatsd.increment('tambourine.client.message');
  //check msg starts with prefix, user not a bot
  if (!(!msg.content.toLowerCase().startsWith(prefix) || msg.author.bot)) {
    if (false) {
    
    }
}
 //commands end bracket


  //It's JSON my dudes
  //set the file to write to
  filejsonmsglog = editJsonFile(`${__dirname}/logs/json/` + bruhhasadate() + ".log.json");
  //unique ID for the event
  let eventBruhId = genHexString("40");
  //console.log(eventBruhId + ":" + msg.content);
  //WRITE THAT DOWN!
  //console.log(filejsonmsglog);
  filejsonmsglog.set(eventBruhId+".type", "msg");
  filejsonmsglog.set(eventBruhId+".time", new Date());
  //filejsonmsglog.set(eventBruhId+".message.author", msg.author);
    if (true) {
      //if DM 
      if (msg.guild == null) {
        bruhserverlog = "{Server:DM}";
        filejsonmsglog.set(eventBruhId+".message.bruh.dm", true);
      } else {
        bruhserverid = msg.guild.id;
        bruhservername = msg.guild.name;
        bruhserverlog = "[Server:" + bruhserverid + "|" + bruhservername + "]";
        filejsonmsglog.set(eventBruhId+".message.bruh.dm", false);

        //Stores server names
        filejsonmsglog.set(eventBruhId+".message.guild.id", msg.guild.id);
        filejsonmsglog.set(eventBruhId+".message.guild.name", msg.guild.name);
      }
      

      filejsonmsglog.set(eventBruhId+".message.author.id", msg.author.id);
      filejsonmsglog.set(eventBruhId+".message.author.bot", msg.author.bot);
      filejsonmsglog.set(eventBruhId+".message.author.username", msg.author.username);
      filejsonmsglog.set(eventBruhId+".message.author.discriminator", msg.author.discriminator);
      filejsonmsglog.set(eventBruhId+".message.channel.id", msg.channel.id);
      filejsonmsglog.set(eventBruhId+".message.author.avatarURL", msg.author.avatarURL);
      filejsonmsglog.set(eventBruhId+".message.author.createdTimestamp", msg.author.createdTimestamp);
    }

  filejsonmsglog.set(eventBruhId+".message.content", msg.content);
  filejsonmsglog.set(eventBruhId+".message.tag", msg.tag);
  filejsonmsglog.set(eventBruhId+".message.embeds", msg.embeds);
  filejsonmsglog.set(eventBruhId+".message.id", msg.id);
  //filejsonmsglog.set(eventBruhId+".message.guild", msg.guild);
  filejsonmsglog.set(eventBruhId+".message.attachments", msg.attachments);
  filejsonmsglog.save();

  //console.log(filejsonmsglog.get());

  msgnextlog =  illegalPrint + "User:" + msg.author + ")" + msg.cleanContent + " [Channel:" + msg.channel + "] " + "{" + msg.content + "}" + "~ {Username:" + msg.author.username +  "|Tag:" + msg.author.tag + "}" + bruhserverlog + "{Msg id:" + msg.id + "}" + "Embed:" + msg.embeds;

  console.log(msgnextlog);
  //logFloorGangText(msgnextlog);
},

client.login(token));