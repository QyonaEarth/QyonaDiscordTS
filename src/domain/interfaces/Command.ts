import { Message } from 'discord.js';
import { Bot } from '../bot';

export interface Execute {
  (bot: Bot, message: Message, args?: string[]): Promise<void>;
}

export interface Command {
  name: string;
  description: string;
  category: string;
  execute: Execute;
}
