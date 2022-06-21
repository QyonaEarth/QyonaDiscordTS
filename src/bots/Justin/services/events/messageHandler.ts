import { Message } from 'discord.js';
import { Command } from '../../../../domain/interfaces/Command';
import { Execute } from '../../../../domain/interfaces/Event';

export const name = 'messageHandler';
export const trigger = 'messageCreate';
export const description = 'Logs on console all the messages the bot receive';

export const execute: Execute = async (bot, message: Message) => {
  if (message.author.bot || !message.guild) return;

  //get rid of the prefix and separating the content on an array so it's easier to work with it
  const args: string[] = message.content
    .slice(bot.config.prefix.length)
    .trim()
    .split(/ +/g);
  //get the command from the args[0] slot (now args[0] is the first word after the command)
  const UserCommand: string =
    args[0] != undefined ? args[0].toLowerCase() : 'null';
  args.shift();

  if (
    message.channelId == bot.config.suggestChannelID &&
    UserCommand != 'suggest'
  ) {
    const response: Message<boolean> = await message.channel.send(
      `<@${message.author.id}> This channel is reserved for suggestions!`
    );
    setTimeout(() => response.delete(), 3 * 1000);
    message.delete();
    return;
  }

  if (!message.content.startsWith(bot.config.prefix)) return;

  const command: Command | undefined = bot.commands.get(UserCommand)
    ? bot.commands.get(UserCommand)
    : undefined;
  if (!command) return;
  command.execute(bot, message, args);
  return;
};
