import { Message } from 'discord.js';
import { Bot } from '../../../../domain/bot';
import { Execute } from '../../../../domain/interfaces/Command';
import { infoEmbed } from '../../../../domain/formats/infoEmbed';
export const name = 'welcome';
export const description = 'This is a description';
export const category = 'None';
export const execute: Execute = async (bot: Bot, message: Message) => {
  if (
    !message.guild ||
    !message.member ||
    !message.member.permissions.has(['ADMINISTRATOR'])
  )
    return;

  if (message.mentions.users.size != 1) {
    const response: Message<boolean> = await message.channel.send(
      `<@${message.author.id}> To use this command correctly use ${bot.config.prefix}welcome @user!!`
    );
    setTimeout(() => response.delete(), 3 * 1000);
    message.delete();
    return;
  }

  const user = message.mentions.users.first();
  if (!user) return;
  const channel = message.guild.channels.cache.find(
    (ch) => ch.id === bot.config.welcomeChannelID
  );
  if (!channel || !channel.isText()) return;
  message.delete();

  const embed = new infoEmbed();
  embed.setTitle(`Welcome ${user.username}!`);
  embed.setBody(`It's always refreshing to see new adventurers around here!
    I hope your stay here is epic
  `);
  embed.addField(
    'Information',
    "Don't forget to check <#834712578802450452> the to find out all the information you need!"
  );
  embed.addField(
    'Rules',
    "If you don't want the gods to punish you, take a look at the writings of <#909745799737528360> to find out! para informarse!"
  );
  channel.send({ content: `${user}`, embeds: [embed.embed] });
  return;
};
