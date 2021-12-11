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
  embed1.setTitle('Hace mucho tiempo...');
  embed1.setBody(`...unos aventureros llegaron a las tierras de Qyona con afán de explorar nuevos territorios, y en su viaje se encontrarón con una ciudad que poseía en su interior un palacio.

  Dentro de ese palacio se encontraba **Qyona**, la diosa que habitaba y protegía esas tierras.
  Tras conversar y hacer ciertos favores que les pidió la diosa, esta decidió recompensar a los aventureros.
  Les dió a cada uno poderes de **Semi Dios**, esperando que siguieran a su lado, protegiendo las tierras donde ella vivía, y ofreciéndoles completa hospitalidad para que se quedaran a vivir el ellas.
  
  Los aventureros aceptaron con gusto el obsequio y la gratitud de Qyona, y se quedaron para proteger con su vida misma esas tierras.
  
  Tras el paso del tiempo, los aventureros que llegaban se iban reduciendo hasta que no llegó ninguno nuevo. Los que se convirtieron en Semi Dioses no poseían el poder suficiente para proteger las tierras de tanto mal y de los monstruos que avanzaban.
  
  Las tierras cercanas al palacio se corrompían poco a poco con magia oscura y seres malignos.
  A Qyona y a los Semi Dioses se agotaban les agotaban las fuerzas, y como último contraataque para mantener lo que quedaba de tierra libre de todo mal y por toda la eternidad, decidieron unir fuerzas y levantar la tierra del mismísimo suelo.
  
  Todos ellos entregaron su alma y sus últimos esfuerzos en fusionarse con la tierra y la naturaleza, levantando así las pesadas rocas, creando un inmenso lago que separaba todo mal de lo que ahora era una isla en el cielo.
  
  La leyenda dice que hoy en día, sigue habiendo rastro de Qyona aunque nadie puede confirmar el haberla visto,  y que si llegas a ser tan fuerte como lo fueron los primeros aventureros y liberas sus tierras del mal, también recompensará a los elegidos."
  
  - Os ha gustado la leyenda? Obvio que si  -*se ríe*-
  - La próxima vez os contaré otra historia...`);

  message.delete();
  channel.send({ embeds: [embed1.embed] });
  return;
};
