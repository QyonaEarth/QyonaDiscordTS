import { ColorResolvable, MessageEmbed } from 'discord.js';
import {
  Embed,
  IconStaff,
  QyonaColor,
  QyonaFooter,
  QyonaPortrait,
} from './embed';

export class staffEmbed implements Embed {
  private readonly color: ColorResolvable = QyonaColor;
  private readonly type: string = 'Staff';
  private readonly typeIcon: string = IconStaff;
  private readonly portrait: string = QyonaPortrait;
  private readonly footer: string = QyonaFooter;

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
