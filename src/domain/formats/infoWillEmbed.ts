import { ColorResolvable, MessageEmbed } from 'discord.js';
import { Embed, IconInfo, WillColor, WillFooter, WillPortrait } from './embed';

export class infoWillEmbed implements Embed {
  private readonly color: ColorResolvable = WillColor;
  private readonly type: string = 'Info';
  private readonly typeIcon: string = IconInfo;
  private readonly portrait: string = WillPortrait;
  private readonly footer: string = WillFooter;

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
