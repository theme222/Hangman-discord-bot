// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token , pictures} = require('./config.json');
const { getRandomWords, sendEmbed } = require('./hangbot.js');
var prefix = ',';
var currentWord = '';
var playingWord = '';
let currentPlayers = {};
var playing = false;
var usedWords = [];

// currentPlayers - > message.author.id = playingWord[0] currentWord[1] playing[2] usedWords[3]


// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('--- Hangbot has started ---');
});

client.on("messageCreate", async message => {
  console.log(currentPlayers)
  let messageContent = message.content;
  if (messageContent[0] === prefix){
    messageContent = messageContent.split(prefix)[1]
      
    console.log(message.author.id)
    if (messageContent == "start") {
          
      playingWord = '';
      currentWord = getRandomWords();
      playing = true;
      for (let i = 0; i < currentWord.length; i++) {
        playingWord = playingWord + '- ';
      }
      currentPlayers[message.author.id] = [playingWord,currentWord,playing,usedWords]
      console.log(currentPlayers[message.author.id][2])
      sendEmbed(message,currentPlayers[message.author.id],wrong=false,help=false,embedPosted=false);
      message.delete()
          
    } else if (messageContent == 'help'){
      console.log('help----------')
      currentPlayers[message.author.id] = [playingWord,currentWord,playing,usedWords]
      sendEmbed(message,currentPlayers[message.author.id],wrong=false,help=true,embedPosted=false)
      message.delete()
      
    } else{
      message.reply('Unexpected command : '+ messageContent);
    }
  

  } else if (Object.keys(currentPlayers).includes(message.author.id) && currentPlayers[message.author.id][2]){

    if (messageContent.length == 1 ){ 

      currentPlayers[message.author.id][3].push(messageContent);
      let temp = currentPlayers[message.author.id][0];
      for (i in currentPlayers[message.author.id][1].split('')){
        if (messageContent === currentPlayers[message.author.id][1][i]){
          currentPlayers[message.author.id][0] = currentPlayers[message.author.id][0].split('');
          currentPlayers[message.author.id][0][i*2] = messageContent; 
          currentPlayers[message.author.id][0] = currentPlayers[message.author.id][0].join('');
        }
      }
      if (temp == currentPlayers[message.author.id][0]){
        let lose = sendEmbed(message,currentPlayers[message.author.id],wrong=true);
        if (lose){
          currentPlayers[message.author.id][2] = false
        }
      } else{
        sendEmbed(message,currentPlayers[message.author.id]);
      }
    message.delete()
    }
    
  } 
  
});
// Login to Discord with your client's token
client.login(token);