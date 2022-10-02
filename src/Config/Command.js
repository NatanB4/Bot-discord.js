const fs = require('fs');

module.exports = class CommandConfig {
    constructor() {
        this.commands = new Map()
    }

    addCommand(command) {
        this.commands.add(command)
    }
    removeCommand(command) {
        this.commands.delete(command)
    }
    getCommand(command) {
        return this.commands.values(command)
    }

    showCommands() {
        fs.readdir('./src/Commands', (err, files) => {
            if (err) throw err;
            files.forEach(file => {
                if (!file.endsWith('.js')) return;
                const command = new (require(`../Commands/${file}`));
                this.commands.set(command.name, command);
            });
        });

        return this.commands
    }
}