import { GuildMember, MessageReaction } from 'discord.js';
import { Execute2 } from '../../../../domain/interfaces/Event';

export const name = 'ReactionRoleAdd';
export const trigger = 'messageReactionAdd';
export const description = 'Logs on console all the messages the bot receive';

export const execute: Execute2 = async (
  bot,
  reaction: MessageReaction,
  member: GuildMember | undefined
) => {
  if (reaction.message.id != bot.config.rrMsgID || !member) return;
  if (reaction.emoji.name != '🆗') return;

  const user: GuildMember | undefined =
    reaction.message.guild?.members.cache.find((user) => user.id === member.id);
  if (!user) return;
  user.roles.add(bot.config.RolHumanoID);
};
