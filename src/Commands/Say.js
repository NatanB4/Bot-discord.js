module.exports = class Say {
    constructor() {
        this.name = 'falar'
        this.description = 'Fala algo'
        this.usage = 'say <mensagem>'
        this.aliases = ['falar', 'fala', 'say']
    }

    async run(message, args) {
        message.channel.send(args.join(' '));
    }
}