import { MessageEmbed } from 'discord.js';

export interface Embed {
  embed: MessageEmbed;
  setTitle(title: string): void;
  setBody(body: string): void;
  addField(field: string, value: string): void;
}
