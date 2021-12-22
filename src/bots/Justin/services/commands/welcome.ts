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
      `<@${message.author.id}> Para utilizar este comando utiliza ${bot.config.prefix}welcome @usuario!!`
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
  embed.setTitle(`Bienvenido ${user.username}!`);
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
  channel.send({ content: `${user}`, embeds: [embed.embed] });
  return;
};
