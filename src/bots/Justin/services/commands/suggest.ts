import { Message } from 'discord.js';
import { Bot } from '../../../../domain/bot';
import { Execute } from '../../../../domain/interfaces/Command';
import { infoEmbed } from '../../../../domain/formats/infoEmbed';

export const name = 'sugerencia';
export const description = 'Format a suggestion!';
export const category = 'None';

export const execute: Execute = async (bot: Bot, message: Message) => {
  if (!message || !message.guild || !message.member) return;

  let channel = message.guild.channels.cache.find(
    (c) => c.id == bot.config.suggestChannelID
  );

  if (message.channelId == bot.config.suggestPrivateChannelID)
    channel = message.guild.channels.cache.find(
      (c) => c.id == bot.config.suggestPrivateChannelID
    );

  if (!channel || !channel.isText()) return;

  //get rid of the prefix and separating the content on an array so it's easier to work with it
  const args: string[] = message.content.split(/ +/);
  const sugerencia: string | undefined = args.slice(1).join(' ');
  const embed = new infoEmbed();

  if (!sugerencia) {
    const response: Message<boolean> = await message.channel.send(
      `<@${message.author.id}> Para utilizar este comando utiliza ${bot.config.prefix}sugerencia {Tu sugerencia}!!`
    );
    setTimeout(() => response.delete(), 3 * 1000);
    message.delete();
    return;
  }

  embed.setTitle(`Sugerencia de ${message.member.user.username}!`);
  embed.setBody(`${sugerencia}`);
  embed.addField('Si estas a favor', 'Reacciona con ✅');
  embed.addField('Si estas en contra', 'Reacciona con ❌');

  const MessageEmbed = await channel.send({ embeds: [embed.embed] });
  MessageEmbed.react('✅');
  MessageEmbed.react('❌');
  message.delete();
  return;
};
