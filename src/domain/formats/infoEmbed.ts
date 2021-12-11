import { ColorResolvable, MessageEmbed } from 'discord.js';
import {
  Embed,
  IconInfo,
  JustinColor,
  JustinFooter,
  JustinPortrait,
} from './embed';

export class infoEmbed implements Embed {
  private readonly color: ColorResolvable = JustinColor;
  private readonly type: string = 'Info';
  private readonly typeIcon: string = IconInfo;
  private readonly portrait: string = JustinPortrait;
  private readonly footer: string = JustinFooter;

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
