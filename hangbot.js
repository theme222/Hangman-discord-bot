const { MessageEmbed } = require('discord.js');
const { pictures } = require('./config.json');
let currentPicture = 0;
var previousId = 0;

// info - > message.author.id = playingWord,currentWord,playing,usedWords

function sendEmbed(message,info,wrong=false,help=false,embedPosted=true){ // A function to send embeds according to what is needed
  
  if (wrong){
    currentPicture += 1
  }
  
  if (info[3].length == 0){
    var final = 'None'
  } else {
    var final = info[3].toString()
  }
  
  if (help){ // if embed posted is help command
    
    const exampleEmbed = new MessageEmbed()
	  .setColor('#b6d7a8')
	  .setAuthor({ name: 'Hangbot help commands', iconURL: 'https://cdn.discordapp.com/attachments/865448116249296905/952498398160904252/hangman_discord_bot_1.png'})
	  .setThumbnail('https://cdn.discordapp.com/attachments/865448116249296905/952498398160904252/hangman_discord_bot_1.png')
    .setDescription(info[0])

	  .addFields(
	  	{ name: 'Start game', value: '`{prefix}start`', inline: true },
      { name: 'Stats', value: '`{prefix}stats`', inline: true },
      { name: 'Change prefix', value: '`{prefix}prefix {new prefix}`', inline: true }
	  )
	  .setTimestamp()
    message.channel.send({ embeds: [exampleEmbed] });

  } else if (currentPicture != 10){ // if game is not lost
    if (! info[0].includes('-')){ // if game has won
      const exampleEmbed = new MessageEmbed(previousId.embeds)
  	  .setColor('#00ff16')
  	  .setTitle(message.author.tag + ' Hangman Game')
  	  .setAuthor({ name: 'Hangbot#9432', iconURL: 'https://cdn.discordapp.com/attachments/865448116249296905/952498398160904252/hangman_discord_bot_1.png'})
  	  .setDescription('GG the word was : '+info[1])
  	  .addFields(
  	  	{ name: 'Used letters', value: final, inline: true },
  	  )
  	  .setImage(pictures[currentPicture])
  	  .setTimestamp()
      previousId.edit({ embeds: [exampleEmbed] });
    } else if (embedPosted == false){ // if game just started
      const exampleEmbed = new MessageEmbed()
  	  .setColor('#00ffe1')
  	  .setTitle(message.author.tag + ' Hangman Game')
  	  .setAuthor({ name: 'Hangbot#9432', iconURL: 'https://cdn.discordapp.com/attachments/865448116249296905/952498398160904252/hangman_discord_bot_1.png'})
  	  .setDescription(info[0])
  	  .addFields(
  	  	{ name: 'Used letters', value: final, inline: true },
  	  )
  	  .setImage(pictures[currentPicture])
  	  .setTimestamp()
      ;

      message.channel.send({ embeds: [exampleEmbed] }).then(sent => { 
      previousId = sent});

    } else{ // if game still going
      const exampleEmbed = new MessageEmbed(previousId.embeds)
  	  .setColor('#00ffe1')
  	  .setTitle(message.author.tag + ' Hangman Game')
  	  .setAuthor({ name: 'Hangbot#9432', iconURL: 'https://cdn.discordapp.com/attachments/865448116249296905/952498398160904252/hangman_discord_bot_1.png'})
  	  .setDescription(info[0])
  	  .addFields(
  	  	{ name: 'Used letters', value: final, inline: true },
  	  )
  	  .setImage(pictures[currentPicture])
  	  .setTimestamp()
      ;

      previousId.edit({ embeds: [exampleEmbed] })
    }
      
    
  } else{ // if game lost L
    
    const exampleEmbed = new MessageEmbed(previousId.embeds)
	  .setColor('#E50000')
	  .setTitle(message.author.tag + 'Hangman Game')
	  .setAuthor({ name: 'Hangbot#9432', iconURL: 'https://cdn.discordapp.com/attachments/865448116249296905/952498398160904252/hangman_discord_bot_1.png'})
	  .setDescription('The word was : ' + info[1])

	  .addFields(
	  	{ name: 'Used letters', value: final, inline: true },
	  )
	  .setImage(pictures[10])
	  .setTimestamp()

    previousId.edit({ embeds: [exampleEmbed] })
  }
  

}

// a function to get a random word from the word list
function getRandomWords() { 
  const fs = require('fs')
  let text = fs.readFileSync('words_new.txt').toString().split("\n");
  return text[Math.floor(Math.random() * text.length)]
}

module.exports = {
  getRandomWords,sendEmbed
};