const Command = require("../../base/Command.js");
const fetch = require("node-superfetch");

class Lizard extends Command {
  constructor(client) {
    super(client, {
      name: "lizard",
      description: "Sends a random image of a lizard.",
      category: "Image",
      usage: "lizard"
    });
  }

  async run(message, args, level, settings) { 
    message.channel.startTyping();

    fetch("https://nekos.life/api/v2/img/lizard")
    .then(res => res.json())
    .then(data => message.channel.send({ file: data.url }))
    .catch(error => {
      this.client.logger.error(error);
      message.channel.stopTyping(true);
      return message.channel.send(`An error occurred: ${error.message}`);
    });

    message.channel.stopTyping(true);
  }
}

module.exports = Lizard;