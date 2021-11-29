import fs from 'fs';
import { join } from 'path';

import { Bot } from '../bot';
import { Command } from '../interfaces/Command';
import ServiceLoader from '../interfaces/ServiceLoader';

class CommandsLoader implements ServiceLoader {
  public readonly dirname: string;
  public readonly target: string;
  public filesLoaded = 0;

  constructor(dirname: string, target: string) {
    this.dirname = dirname;
    this.target = target;
  }
  public load(bot: Bot) {
    const directory: string = join(
      this.dirname,
      '../bots/',
      this.target,
      '/services/commands'
    );
    const commandsFiles: string[] = fs
      .readdirSync(directory)
      .filter((file) => file.endsWith('.js'));
    for (const file of commandsFiles) {
      const command: Command = require(`${directory}/${file}`);
      bot.commands.set(command.name, command);
    }
  }
}
export default CommandsLoader;
