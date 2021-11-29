import fs from 'fs';
import { join } from 'path';

import { Bot } from '../bot';
import ServiceLoader from '../interfaces/ServiceLoader';

class EventsLoader implements ServiceLoader {
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
      '/services/events'
    );
    const eventFiles: string[] = fs
      .readdirSync(directory)
      .filter((file) => file.endsWith('.js'));
    for (const file of eventFiles) {
      const event = require(`${directory}/${file}`);
      bot.events.set(event.name, event);
      bot.on(event.trigger, event.execute.bind(null, bot));
    }
  }
}
export default EventsLoader;
