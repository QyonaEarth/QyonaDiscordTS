import { ColorResolvable, MessageEmbed } from 'discord.js';
import { Embed } from './embed';

export class infoEmbed implements Embed {
  private readonly color: ColorResolvable = '#3f0d05';
  private readonly type: string = 'Info';
  private readonly typeIcon: string = 'https://i.imgur.com/JVvF4Dl.png';
  private readonly portrait: string = 'https://i.imgur.com/4VrPDsF.png';
  private readonly footer: string = "Justin - Guardián de Qyona's Earth";

  public embed: MessageEmbed;

  constructor() {
    this.embed = new MessageEmbed()
      .setColor(this.color)
      .setAuthor(this.type, this.typeIcon)
      .setThumbnail(this.portrait)
      .setFooter(this.footer);
  }

  setTitle(title: string) {
    this.embed.setTitle(title);
  }
  setBody(body: string) {
    this.embed.setDescription(body);
  }
  addField(field: string, value: string) {
    this.embed.addField(field, value);
  }
}
