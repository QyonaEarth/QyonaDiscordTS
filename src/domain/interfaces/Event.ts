import { GuildMember, Message, MessageReaction } from 'discord.js';
import { Bot } from '../bot';

export interface Execute {
  (bot: Bot, message: Message, member?: GuildMember): Promise<void>;
}
export interface Execute2 {
  (bot: Bot, reaction: MessageReaction, member?: GuildMember): Promise<void>;
}

export interface Event {
  name: string;
  trigger: string;
  description: string;
  execute: Execute;
}
