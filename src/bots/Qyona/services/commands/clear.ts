import { Message, TextChannel } from "discord.js";
import { Bot } from "../../../../domain/bot";
import { Execute } from "../../../../domain/interfaces/Command";

export const name = 'clear';
export const description = 'Borra una cantidad de mensajes del chat! (maximos mensajes a borrar = ${maxDeleting}) para utilizarlo usa el comando ${prefix}clear {Número} (Ese numero no puede ser cero!)';
export const category = 'staff';

export const execute: Execute = async (bot: Bot, message: Message) => {
    const args: string[] = message.content.split(/ +/).slice(1);
    if(!(message.channel.type=='GUILD_TEXT'))return;
    if (!args[0] || isNaN(parseInt(args[0])) || parseInt(args[0]) < 1) {
        const response = await message.reply(`Debes utilizar ${bot.config.prefix}clear {Número} para utilizar el comando correctamente. (Ese numero no puede ser cero!)`)
        setTimeout(() => response.delete(), 3 * 1000);
        setTimeout(() => message.delete(), 3 * 1000);
        return;
    }
    const deleteCount:number = parseInt(args[0]);
    if( deleteCount > parseInt(bot.config.maxDeleting) ){
        await message.channel.send(`No puedo borrar más de ${bot.config.maxDeleting} mensajes.`)
        await message.channel.messages.fetch({ limit: parseInt(bot.config.maxDeleting+1) }).then(messages => {
            (message.channel as TextChannel).bulkDelete(messages) 
        }).catch(async (err) => {
            return console.error(err);
        });
        const response2 = await message.channel.send(`Borrados \'${bot.config.maxDeleting}\' mensajes!`)
        setTimeout(() => (response2.delete()), 3 * 1000);
        return;
    };


    await message.channel.messages.fetch({ limit: deleteCount+1 }).then(messages => {
        (message.channel as TextChannel).bulkDelete(messages) 
    });
    const response = await message.channel.send(`Borrados \'${deleteCount}\' mensajes!`)
    setTimeout(() => (response.delete()), 3 * 1000);
    return;
}