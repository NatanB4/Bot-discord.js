const {
  SlashCommandBuilder,
  GuildMember,
  EmbedBuilder,
} = require("discord.js");
const { Player, QueryType } = require("discord-player");

module.exports = class VoiceInreraction {
  constructor() {
    this.name = "musica";
    this.description = "Comandos de música, como tocar, parar, etc.";
    this.usage = "/musica <mensagem>";
  }

  /**
   * @param {import("discord.js").CommandInteraction} interaction
   * @param {import("discord.js").Client} client
   */
  async run(interaction, client) {
    if (!interaction.isCommand() || !interaction.guildId) return;

    if (
      !(interaction.member instanceof GuildMember) ||
      !interaction.member.voice.channel
    ) {
      return void interaction.reply({
        content:
          "Você precisa estar em um canal de voz para usar esse comando!",
        ephemeral: true,
      });
    }

    const subcommand = interaction.options.getSubcommand();
    if (subcommand === "tocar") return await this.play(interaction, client);
    if (subcommand === "parar") return await this.stop(interaction, client);
    // if (subcommand === "lista") return await this.list(interaction, client);
    if (subcommand === "pular") return await this.skip(interaction, client);
  }

  /**
   * @param {import("discord.js").CommandInteraction} interaction
   * @param {import("discord.js").Client} client
   */
  async play(interaction, client) {
    const player = new Player(client);
    const query = interaction.options.get("musica").value;

    const searchResult = await player
      .search(query, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      })
      .catch(() => {
        void interaction.reply({
          content: "Não foi possível encontrar essa música :(",
        });
      });

    if (!searchResult || !searchResult.tracks.length)
      return void interaction.reply({
        content: "Musica não encontrada",
        ephemeral: true,
      });

    const queue = player.createQueue(interaction.guild, {
      metadata: interaction.channel,
    });

    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel);
    } catch {
      void player.deleteQueue(interaction.guildId);
      return void interaction.reply({
        content: "Não foi possível entrar no canal de voz :(",
      });
    }

    const informations = {
      description: "",
    };
    searchResult.tracks.forEach((track, index) => {
      informations.description += `${index} -   **${track.title}** - ${track.duration} \n`;
    });

    const embed = new EmbedBuilder()
      .setColor("#ff0045")
      .setDescription(informations.description)
      .setAuthor({
        name: `Músicas encontradas para: ${query}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setFooter({
        text: "Todos os direitos reservados - 2021",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });

    await interaction.channel.send({
      embeds: [embed],
    });

    const id = interaction.options.get("id")?.value || 0;

    searchResult.playlist
      ? queue.addTracks(searchResult.tracks)
      : queue.addTrack(searchResult.tracks[id]);

    if (!queue.playing) {
      await interaction.channel.send({
        content: `Tocando agora: ${searchResult.tracks[id].title}`,
      });

      await queue.play().catch(console.error);
    }
  }

  /**
   * @param {import("discord.js").CommandInteraction} interaction
   * @param {import("discord.js").Client} client
   */
  async stop(interaction, client) {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: "Não há nada tocando no momento!",
      });
    queue.destroy();
    return void interaction.followUp({ content: "Musica atual foi pausada" });
  }

  async skip(interaction, client) {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: "❌ | No music is being played!",
      });
    const currentTrack = queue.current;
    const success = queue.skip();
    return void interaction.followUp({
      content: success
        ? `✅ | Skipped **${currentTrack}**!`
        : "❌ | Something went wrong!",
    });
  }
  async list() {}

  request() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addSubcommand((subcommand) =>
        subcommand
          .setName("tocar")
          .setDescription("Toca uma música")
          .addStringOption((option) =>
            option
              .setName("musica")
              .setDescription("Música que será tocada")
              .setRequired(true)
          )
          .addNumberOption((option) =>
            option
              .setName("id")
              .setDescription(
                "ID da música que será tocada, caso não seja informado, será tocada a primeira música encontrada"
              )
              .setRequired(false)
          )
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("parar")
          .setDescription("Para a música que está tocando")
          .addStringOption((option) =>
            option
              .setName("musica")
              .setDescription("Música que será Parada")
              .setRequired(true)
          )
      )
      .addSubcommand((subcommand) =>
        subcommand.setName("lista").setDescription("Mostra a lista de músicas")
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("pular")
          .setDescription("Pula a música que está tocando")
      );
  }
};
