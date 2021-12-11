import { ColorResolvable, MessageEmbed } from 'discord.js';
import { Embed } from './embed';

export class staffEmbed implements Embed {
  private readonly color: ColorResolvable = '#d88302';
  private readonly type: string = 'Staff';
  private readonly typeIcon: string = 'https://i.imgur.com/sZUB1kT.png';
  private readonly portrait: string = 'https://i.imgur.com/vCh2ng2.png';
  private readonly footer: string = "Qyona - Diosa de Qyona's Earth";

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
