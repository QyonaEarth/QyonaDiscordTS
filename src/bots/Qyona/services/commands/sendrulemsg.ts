import { Message } from 'discord.js';
import { Bot } from '../../../../domain/bot';
import { Execute } from '../../../../domain/interfaces/Command';
import { staffEmbed } from '../../../../domain/formats/staffEmbed';
export const name = 'sendrulemsg';
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
  embed1.setTitle('Listen adventurer...');
  embed1.setBody(`*Even if you don't see me
 I will always be close to you... Protecting you,
 But, for this, you must promise me the following:*

           **1.** Respect everyone as you want them to respect you.
           **2.** Do not use profanity or dirty your voice with insults.
           **3.** Do not share information about other worlds, or at least ask permission.
           **4.** Sexualized content is not allowed.
           **5.** Do not use bad nicknames or use offensive images.
           **6.** Each topic has its place to be discussed. Use them correctly.
           **7.** Take care of the ears of your companions. Don't yell or use sounds that are too loud.
           **8.** If you are under 16, you should not be an adventurer. It could be dangerous.
           **9.** Any breach of the above may cost you to be banished.
           **10.** Have fun and make friends!!
`);

  message.delete();
  channel.send({ embeds: [embed1.embed] });
  return;
};
