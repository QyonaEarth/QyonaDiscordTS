import { Execute } from '../../../../domain/interfaces/Event';
import { infoEmbed } from '../../../../domain/formats/infoEmbed';
import { GuildMember } from 'discord.js';

export const name = 'UserJoinedServer';
export const trigger = 'guildMemberAdd';
export const description = 'Da la bienvenida a los nuevos integrantes';

export const execute: Execute = async (bot, message) => {
  if (!message || !message.guild) return;

  const memberId: string = message
    .toString()
    .slice(2, message.toString().length - 1);

  const member: GuildMember | undefined = message.guild.members.cache.find(
    (user) => user.id == memberId
  );

  if (!member) return;

  const channel = member.guild.channels.cache.find(
    (ch) => ch.id === bot.config.welcomeChannelID
  );
  if (!channel || !channel.isText()) return;

  const embed = new infoEmbed();
  embed.setTitle(`Welcome ${member.user.username}!`);
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
  channel.send({ content: `${member.user}`, embeds: [embed.embed] });
  return;
};
