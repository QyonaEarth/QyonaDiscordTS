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
  embed.setTitle(`Bienvenido ${member.user.username}!`);
  embed.setBody(
    `Siempre es reconfortante ver nuevos aventureros por aquí!\nEspero que su estancia por aquí sea épica`
  );
  embed.addField(
    'Información',
    'No olvide consultar el portal <#834712578802450452> para informarse!'
  );
  embed.addField(
    'Reglas',
    'Si no quiere que los dioses cargen sobre usted, eche un vistazo a los escritos de <#909745799737528360> para informarse!'
  );
  channel.send({ content: `${member.user}`, embeds: [embed.embed] });
  return;
};
