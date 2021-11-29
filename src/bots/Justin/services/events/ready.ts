import { Execute } from '../../../../domain/interfaces/Event';

export const execute: Execute = async (bot) => {
  bot.logger.success(`${bot.user?.tag} logged in!`);
};
export const name = 'ready';
export const trigger = 'ready';
export const description = 'notify that bot is logged in';
