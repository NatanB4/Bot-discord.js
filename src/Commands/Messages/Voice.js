const {
  joinVoiceChannel,
  createAudioPlayer,
  VoiceConnectionStatus,
  createAudioResource,
  AudioPlayerStatus,
} = require("@discordjs/voice");

const ytdl = require("ytdl-core");

module.exports = class Voice {
  constructor() {
    this.name = "voice";
    this.description = "Fala algo";
    this.usage = "voice <mensagem>";
    this.aliases = ["play"];
  }

  /**
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   */
  async run(message, args) {}
};
