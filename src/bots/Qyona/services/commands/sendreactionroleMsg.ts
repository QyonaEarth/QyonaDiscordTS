import { Message } from 'discord.js';
import { Bot } from '../../../../domain/bot';
import { Execute } from '../../../../domain/interfaces/Command';
import { staffEmbed } from '../../../../domain/formats/staffEmbed';
export const name = 'sendreactionrolemsg';
export const description = 'This is a description';
export const category = 'None';
export const execute: Execute = async (bot: Bot, message: Message) => {
  if (
    !message.guild ||
    !message.member ||
    !message.member.permissions.has(['ADMINISTRATOR'])
  )
    return;

  const channel = message.guild.channels.cache.find(
    (ch) => ch.id === bot.config.ruleChannelID
  );
  if (!channel || !channel.isText()) return;

  const embed1 = new staffEmbed();
  embed1.setBody(`React with 🆗 to this message if you accept this rules.
Good luck with your journey adventurer!`);

  message.delete();
  const rrMessage: Message = await channel.send({ embeds: [embed1.embed] });
  rrMessage.react('🆗');

  bot.updateConfig('rrMsgID', rrMessage.id);

  return;
};
