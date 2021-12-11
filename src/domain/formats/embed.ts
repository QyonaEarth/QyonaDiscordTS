import { ColorResolvable, MessageEmbed } from 'discord.js';

export interface Embed {
  embed: MessageEmbed;
  setTitle(title: string): void;
  setBody(body: string): void;
  addField(field: string, value: string): void;
}

export const WillColor: ColorResolvable = '#09bcd8';
export const QyonaColor: ColorResolvable = '#d88302';
export const JustinColor: ColorResolvable = '#3f0d05';

export const IconStaff = 'https://i.imgur.com/sZUB1kT.png';
export const IconNews = 'https://i.imgur.com/7NJrl7C.png';
export const IconInfo = 'https://i.imgur.com/JVvF4Dl.png';

export const QyonaPortrait = 'https://i.imgur.com/vCh2ng2.png';
export const WillPortrait = 'https://i.imgur.com/2yHOYsc.png';
export const JustinPortrait = 'https://i.imgur.com/4VrPDsF.png';

export const QyonaFooter = "Qyona - Diosa de Qyona's Earth";
export const WillFooter = 'Will - Emisario de las tierras de Qyona';
export const JustinFooter = "Justin - Guardián de Qyona's Earth";
