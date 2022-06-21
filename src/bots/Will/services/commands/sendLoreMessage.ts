import { Message } from 'discord.js';
import { Bot } from '../../../../domain/bot';
import { Execute } from '../../../../domain/interfaces/Command';
import { infoWillEmbed } from '../../../../domain/formats/infoWillEmbed';
export const name = 'sendloremsg';
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
    (ch) => ch.id === bot.config.loreChannelID
  );
  if (!channel || !channel.isText()) return;

  const embed1 = new infoWillEmbed();
  embed1.setTitle('Where am I...?');
  embed1.setBody(`- Hmm? What is this site? *Superior smile* Well...I'll explain it to you.

Once upon a time, not so very long ago, the Gods decided to give young Qyona a place where the sunsets were the most beautiful ones in this cosmos. Qyona, baptized her new lands as *Ishan*

After a long time, some adventurers began to pass through their lands, on exploration trips. She offered them the chance to settle down and create life to beautify and give more than visual meaning to Ishan.
Only a few considered staying to live, and even fewer decided to do so, but little by little, they increased in number and improved their skills.
Along with the adventurers, new life forms arose from nature. Monsters and wild animals that made it difficult for the emerging cities to expand, and more fauna and flora to discover.
Various races emerged, such as elves, fairies... and joined forces according to their ideals to combat the dark spirits. They polished their skills and improved their weapons, also they made combat strategies regardless of the nature of each one. Peace reigned within each kingdom, and was restored in the unnamed fields...until a conflict erupted with a neighboring kingdom.

Fulfilling her new mission as a goddess, Qyona used her powers and created a battle zone, a Sanctuary of Gods, where both parties could fight without harming the rest of the kingdoms, under the condition that she will be the one maintaining justice.
Justice and superiority would decide the outcome of the battle, and balance the differences between the kingdoms.

- If you accept the conditions of the Goddess, I am sure that she will let you live and start your adventure in Ishan.
oh! By the way, it's 5 suns *Smiles mischievously*`);

  message.delete();
  channel.send({ embeds: [embed1.embed] });
  return;
};
