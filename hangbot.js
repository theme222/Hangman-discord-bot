const { MessageEmbed } = require("discord.js");
const pictures = [
  "https://cdn.discordapp.com/attachments/865448116249296905/952501634955620382/hangman_10_copy.png",
  "https://cdn.discordapp.com/attachments/865448116249296905/952492947851595846/hangman_10.png",
  "https://cdn.discordapp.com/attachments/865448116249296905/952492947633471498/hangman_9.png",
  "https://cdn.discordapp.com/attachments/865448116249296905/952492947402817536/hangman_8.png",
  "https://cdn.discordapp.com/attachments/865448116249296905/952492947172114482/hangman_7.png",
  "https://cdn.discordapp.com/attachments/865448116249296905/952492946979180574/hangman_6.png",
  "https://cdn.discordapp.com/attachments/865448116249296905/952492946740084766/hangman_5.png",
  "https://cdn.discordapp.com/attachments/865448116249296905/952492946509402143/hangman_4.png",
  "https://cdn.discordapp.com/attachments/865448116249296905/952492946169684018/hangman_3.png",
  "https://cdn.discordapp.com/attachments/865448116249296905/952492945968341012/hangman_2.png",
  "https://cdn.discordapp.com/attachments/865448116249296905/952492945733472326/hangman_1.png",
];
let currentPicture = 0;
var previousId = 0;
var playingEmbed = {};

// info - > message.author.id = playingWord,currentWord,playing,usedWords

function sendEmbed(
  message,
  info,
  wrong = false,
  help = false,
  embedPosted = true
) {
  // A function to send embeds according to what is needed

  currentPicture = 0;
  for (let i of info[3]) {
    if (!info[1].includes(i)) {
      currentPicture += 1;
    }
  }

  if (info[3].length == 0) {
    var final = "None";
  } else {
    {
      var final = info[3].toString();
    }
  }

  if (help === true || help === "stop") {
    // if embed posted is help command
    if (help === true) {
      const exampleEmbed = new MessageEmbed()
        .setColor("#b6d7a8")
        .setAuthor({
          name: "Hangbot help commands",
          iconURL:
            "https://cdn.discordapp.com/attachments/865448116249296905/952498398160904252/hangman_discord_bot_1.png",
        })
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/865448116249296905/952498398160904252/hangman_discord_bot_1.png"
        )
        .setDescription(info[0])

        .addFields(
          { name: "Start game", value: "`{prefix}start`", inline: true },
          { name: "Help", value: "`{prefix}help`", inline: true },
          {
            name: "Stop",
            value: "`{prefix}stop`",
            inline: true,
          }
        )
        .setTimestamp();
      message.channel.send({ embeds: [exampleEmbed] });
    } else if (help === "stop") {
      const exampleEmbed = new MessageEmbed(
        playingEmbed[message.author.id].embeds
      )
        .setColor("#E50000")
        .setTitle(message.author.tag + " Hangman Game")
        .setAuthor({
          name: "Hangbot#9432",
          iconURL:
            "https://cdn.discordapp.com/attachments/865448116249296905/952498398160904252/hangman_discord_bot_1.png",
        })
        .setDescription("The word was : " + info[1])

        .addFields({ name: "Used letters", value: final, inline: true })
        .setImage(pictures[10])
        .setTimestamp();

      playingEmbed[message.author.id].edit({ embeds: [exampleEmbed] });
    }
  } else if (currentPicture != 11) {
    // if game is not lost
    if (!info[0].includes("-")) {
      // if game has won
      const exampleEmbed = new MessageEmbed(
        playingEmbed[message.author.id].embeds
      )
        .setColor("#00ff16")
        .setTitle(message.author.tag + " Hangman Game")
        .setAuthor({
          name: "Hangbot#9432",
          iconURL:
            "https://cdn.discordapp.com/attachments/865448116249296905/952498398160904252/hangman_discord_bot_1.png",
        })
        .setDescription("GG the word was : " + info[1])
        .addFields({ name: "Used letters", value: final, inline: true })
        .setImage(pictures[currentPicture])
        .setTimestamp();
      playingEmbed[message.author.id].edit({ embeds: [exampleEmbed] });
      currentPicture = 0;
    } else if (embedPosted == false) {
      // if game just started
      const exampleEmbed = new MessageEmbed()
        .setColor("#00ffe1")
        .setTitle(message.author.tag + " Hangman Game")
        .setAuthor({
          name: "Hangbot#9432",
          iconURL:
            "https://cdn.discordapp.com/attachments/865448116249296905/952498398160904252/hangman_discord_bot_1.png",
        })
        .setDescription(info[0])
        .addFields({ name: "Used letters", value: final, inline: true })
        .setImage(pictures[currentPicture])
        .setTimestamp();
      message.channel.send({ embeds: [exampleEmbed] }).then((sent) => {
        playingEmbed[message.author.id] = sent;
      });
    } else {
      // if game still going
      const exampleEmbed = new MessageEmbed(
        playingEmbed[message.author.id].embeds
      )
        .setColor("#00ffe1")
        .setTitle(message.author.tag + " Hangman Game")
        .setAuthor({
          name: "Hangbot#9432",
          iconURL:
            "https://cdn.discordapp.com/attachments/865448116249296905/952498398160904252/hangman_discord_bot_1.png",
        })
        .setDescription(info[0])
        .addFields({ name: "Used letters", value: final, inline: true })
        .setImage(pictures[currentPicture])
        .setTimestamp();
      playingEmbed[message.author.id].edit({ embeds: [exampleEmbed] });
    }
  } else {
    if (!embedPosted) {
      // if restarted
      currentPicture = 0;
      const exampleEmbed = new MessageEmbed()
        .setColor("#00ffe1")
        .setTitle(message.author.tag + " Hangman Game")
        .setAuthor({
          name: "Hangbot#9432",
          iconURL:
            "https://cdn.discordapp.com/attachments/865448116249296905/952498398160904252/hangman_discord_bot_1.png",
        })
        .setDescription(info[0])
        .addFields({ name: "Used letters", value: final, inline: true })
        .setImage(pictures[currentPicture])
        .setTimestamp();
      message.channel.send({ embeds: [exampleEmbed] }).then((sent) => {
        playingEmbed[message.author.id] = sent;
      });
    } else {
      // if game lost L

      const exampleEmbed = new MessageEmbed(
        playingEmbed[message.author.id].embeds
      )
        .setColor("#E50000")
        .setTitle(message.author.tag + " Hangman Game")
        .setAuthor({
          name: "Hangbot#9432",
          iconURL:
            "https://cdn.discordapp.com/attachments/865448116249296905/952498398160904252/hangman_discord_bot_1.png",
        })
        .setDescription("The word was : " + info[1])

        .addFields({ name: "Used letters", value: final, inline: true })
        .setImage(pictures[10])
        .setTimestamp();

      playingEmbed[message.author.id].edit({ embeds: [exampleEmbed] });
    }
  }
}

// a function to get a random word from the word list
function getRandomWords() {
  const fs = require("fs");
  let text = fs.readFileSync("words_new.txt").toString().split("\n");
  return text[Math.floor(Math.random() * text.length)];
}

module.exports = {
  getRandomWords,
  sendEmbed,
};
