import {Bot} from '../../domain/bot'
import { status } from 'minecraft-server-util';
import { JavaStatusResponse } from 'minecraft-server-util/dist/types/JavaStatusResponse';
import { BaseGuildTextChannel, Channel, ColorResolvable, Guild, Message, MessageEmbed, TextChannel } from 'discord.js';

let Justin :Bot

if(!process.env.justin_token){
    console.log('justin_token not found!');
}
else{
    Justin = new Bot(process.env.justin_token, 'Justin');
    Justin.start();
    setInterval(handleStatus,10*1000)

    
}


let lastStatus: JavaStatusResponse|undefined = undefined


function handleStatus(){
    getStatus().then( (res) => {
        HandleStatusOutCome(res)
    })
}


async function getStatus (): Promise<JavaStatusResponse|undefined> {
    let response = await status('qyonasearth.es', 25565) ;
    return response;
}


async function HandleStatusOutCome(res:JavaStatusResponse|undefined){
    const statusChannel:BaseGuildTextChannel|undefined = Justin.channels.cache.find( c => c.id == Justin.config.statusChannelID) as BaseGuildTextChannel|undefined
        if(!statusChannel || !statusChannel.isText()) {
            return;
        }
        const statusMessage:Message|undefined = (await statusChannel.messages.fetch()).find(m => m.id == Justin.config.statusMessageID)
        if(!statusMessage) {
            let newMessage = await statusChannel.send({embeds: [getStatusEmbed(res)] })
            Justin.updateConfig('statusMessageID', newMessage.id )
            lastStatus = res;
            return;
        }

        if( (!lastStatus && res) || (lastStatus && res && lastStatus.players.online != res.players.online) || (lastStatus && !res) ){
            lastStatus = res;
            statusMessage.edit({embeds: [getStatusEmbed(res)] })
        }
}


function getStatusEmbed(res:JavaStatusResponse|undefined):MessageEmbed{
    let embed = new MessageEmbed()
    if(!res){
        embed.setColor('#ff0000' as ColorResolvable)
        embed.setTitle('El servidor se encuentra cerrado :(')
        embed.setThumbnail(Justin.config.QyonaSvLogo)
        embed.setDescription('Vuelve pronto! Estamos trabajando duro para que pronto vuelva a estar online!')
        return embed;
    }

    embed.setColor('#00ff00' as ColorResolvable)
    embed.setTitle('Servidor abierto! :D')
    embed.setThumbnail(Justin.config.QyonaSvLogo)
    embed.setDescription('Apresurate! Te estan esperando muchas aventuras dentro de las tierras de Qyona!')
    embed.addField('Aventureros activos', `${res.players.online}/${res.players.max}`)

    return embed;
}