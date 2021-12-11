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
  embed1.setTitle('Escucha aventurero...');
  embed1.setBody(`*Aunque tu no me veas
  Yo siempre estaré cerca tuya...Protegiéndote,
           Pero, para ello, tu deberás prometerme lo siguiente:*

       **1.** Respeta a todos como quieras que te respeten a ti.
       **2.** No uses blasfemias ni ensucies tu voz con insultos.
       **3.** No compartas información sobre otros mundos, o al menos, pide permiso.
       **4.** No se permiten contenidos sexualizados.
       **5.** No emplees apodos o uses imágenes ofensivas.
       **6.** Cada tema tiene su lugar para ser hablado. Úsalos correctamente.
       **7.** Cuida los oídos de tus compañeros. No grites o uses sonidos demasiado altos.
       **8.** Si eres menor de 16 años, no deberías de ser aventurero. Puede ser peligroso.
       **9.** Cualquier incumplimiento de lo anterior, podrá costarte ser desterrado.
      **10.** Pásalo bien y colabora en proteger mi Tierra.
`);

  message.delete();
  channel.send({ embeds: [embed1.embed] });
  return;
};
