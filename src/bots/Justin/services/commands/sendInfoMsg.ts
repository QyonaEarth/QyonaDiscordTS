import { Message } from 'discord.js';
import { Bot } from '../../../../domain/bot';
import { Execute } from '../../../../domain/interfaces/Command';
import { infoEmbed } from '../../../../domain/formats/infoEmbed';
export const name = 'sendinfomsg';
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
    (ch) => ch.id === bot.config.infoChannelID
  );
  if (!channel || !channel.isText()) return;

  const embed1 = new infoEmbed();
  embed1.setTitle('Welcome adventurer!!');
  embed1.setBody(`**Qyona's Network** is your entertainment server, based on a RPG Fantasy World.
    Currently we only have one game mode, but as soon as we can we will be implementing more modes for you to choose your favorite!

    **Ishan, the land of sunset:**
    The Ishan map is based on a realistic world with a diversity of biomes where you can create or join a city, declare war on enemy cities, or for example, select how you want your character to be.
    You can choose your race, be it elf, human, fairy, orc...or more. Also your way of playing and combat, choosing a main class and improving your skills little by little, or your way of getting money, choosing a job that allows you to buy items or weapons that improve your skills.

    **More gamemodes in the future**

    \`\`\`javascript\n\t\t\t\tYour journey begins\n\t\t\t // ${bot.config.ip} // \n\t\t\t\t\t1.18.1\n\`\`\`
    `);

  const embed2 = new infoEmbed();
  embed2.setTitle('You have problems?');
  embed2.setBody(`In case you know of someone who is breaking their promise to Qyona, or who is doing something wrong to you, you can report it.
    For this you will only need to show me some visual evidence and put it with a **!report** the name of the player and the description of your problem.

    In case you need help with something, you can call any @Watchman to solve your problem.

    I hope you enjoy your stay at Qyona's Network!`);

  message.delete();
  channel.send({ embeds: [embed1.embed, embed2.embed] });
  return;
};
