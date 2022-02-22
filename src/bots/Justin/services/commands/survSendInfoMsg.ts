import { Message } from 'discord.js';
import { Bot } from '../../../../domain/bot';
import { Execute } from '../../../../domain/interfaces/Command';
import { infoEmbed } from '../../../../domain/formats/infoEmbed';
export const name = 'survsendinfomsg';
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
  embed1.setBody(`* Qyona's Earth* será tu lugar para investigar, mejorar tus habilidades y blandir tu espada contra incontables monstruos y enemigos.
  Para que lo entiendas, te contaré la historia.
  
  Hace mucho tiempo, los dioses decidieron regalarle a la joven Qyona un lugar donde los atardeceres eran los más bonitos del cosmos.
  Ella, cumpliendo con su nuevo cometido de diosa, preservó durante mucho tiempo su tierra, cediéndola como hogar a aquellos aventureros que pasaban de viaje.
  Se dice que un grupo de ellos decidieron quedarse, y ayudar a Qyona a seguir embelleciendo aún más si cabe el lugar, y librándolo de todo mal y peligro.
  Como agradecimiento, Qyona decidió regalar los poderes de Semi Dios a los tres aventureros, para ayudarla ya que la corrupción se estaba empezando a apoderar de su mundo.
  Actualmente, los cuatro dioses se han unido a la tierra de la isla principal, haciendo poco a poco que se desprenda de la tierra, para intentar salvar la ciudad, y que no llegue a corromperse.
  
  Necesitan toda la ayuda posible para reducir la maldad del resto de tierras, y poder sobrevivir la batalla sin haberse sacrificado en vano.
  
  Ayúdanos a sobrevivir, y sobrevive tu tambien.
  
  Tu decides si quieres arriesgar tu vida.
  Te dejo una guía, quizá te ayude. **Extiende la mano con un libro**

    \`\`\`javascript\n\t\t\t\tPrimera parada\n\t\t\t // ${bot.config.ip} // \n\t\t\t\t\t1.18.1\n\`\`\`
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
