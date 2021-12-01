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
  embed1.setTitle('Bienvenido aventurero!!');
  embed1.setBody(`*𝔔ყ𝔬𝔫𝔞'𝔰 𝔈𝔞𝔯𝔱𝔥*  será tu lugar para investigar, mejorar tus habilidades y blandir tu espada contra incontables monstruos.
    Para que lo entiendas, te contaré la historia.
    
    Hace miles de años, los dioses decidieron regalarle a la joven Qyona un lugar donde los atardeceres eran los más bonitos del cosmos.
    Ella, cumpliendo con su nuevo cometido de diosa, preservó durante mucho tiempo su tierra, cediéndola como hogar a aquellos aventureros que pasaban de viaje.
    Se dice que un grupo de ellos decidieron quedarse, y ayudar a Qyona a seguir embelleciendo aún más si cabe el lugar, y librándolo de todo mal y peligro.
    
    Como compensación, Qyona dió su vida, y a cambio les otorgó poderes de semidios a los aventureros.
    También dicen que ellos se unieron a la tierra para protegerla por toda la eternidad, levantando la ciudad del mismo suelo, y usando sus poderes para mantenerla en el aire.
    
    No te lo crees? Bueno, tu te lo pierdes....Yo ya lo he visto con mis propios ojos. ** *Sonríe* **
    
    Tu decides si intentarlo. Arrepentirás.
    Te dejo una guía. **Extiende la mano con un libro**

    \`\`\`javascript\n\t\t\t\tPrimera parada\n\t\t\t // ${bot.config.ip} // \n\t\t\t\t\t1.17.1\n\`\`\`
    `);

  const embed2 = new infoEmbed();
  embed2.setTitle('Tienes problemas?');
  embed2.setBody(`En caso de que sepas de alguien que esté incumpliendo su promesa a Qyona, o que te esté haciendo algún mal puedes reportarlo.
    Para ello solo necesitarás mostrarme alguna evidencia visual  y ponerla con un **!reportar** el nombre del sujeto y la descripción de tu problema.
    
    En caso de que necesites ayuda con algo, puedes llamar a cualquier <@&913194482604834817> para que te resuelva tu problema.
    
    Espero que disfrutes de tu estancia en *Qyona's Earth*!`);

  message.delete();
  channel.send({ embeds: [embed1.embed, embed2.embed] });
  return;
};
