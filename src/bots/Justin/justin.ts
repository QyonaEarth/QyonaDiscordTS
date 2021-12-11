import { Bot } from '../../domain/bot';
import { status } from 'minecraft-server-util';
import { JavaStatusResponse } from 'minecraft-server-util/dist/types/JavaStatusResponse';
import {
  BaseGuildTextChannel,
  ColorResolvable,
  Message,
  MessageEmbed,
} from 'discord.js';

let Justin: Bot;

if (!process.env.justin_token) {
  console.log('justin_token not found!');
} else {
  Justin = new Bot(process.env.justin_token, 'Justin');
  Justin.start();
  setInterval(handleStatus, 10 * 1000);
}

let lastStatus: JavaStatusResponse | undefined = undefined;

function handleStatus() {
  getStatus().then((res) => {
    HandleStatusOutCome(res);
  });
}

async function getStatus(): Promise<JavaStatusResponse | undefined> {
  const response = await status('qyonasearth.es', 25565);
  return response;
}

async function HandleStatusOutCome(res: JavaStatusResponse | undefined) {
  const statusChannel: BaseGuildTextChannel | undefined =
    Justin.channels.cache.find((c) => c.id == Justin.config.statusChannelID) as
      | BaseGuildTextChannel
      | undefined;
  if (!statusChannel || !statusChannel.isText()) {
    return;
  }
  const statusMessage: Message | undefined = (
    await statusChannel.messages.fetch()
  ).find((m) => m.id == Justin.config.statusMessageID);
  if (!statusMessage) {
    const newMessage = await statusChannel.send({
      embeds: [await getStatusEmbed(res)],
    });
    Justin.updateConfig('statusMessageID', newMessage.id);
    lastStatus = res;
    return;
  }

  if (
    (!lastStatus && res) ||
    (lastStatus && res && lastStatus.players.online != res.players.online) ||
    (lastStatus && !res)
  ) {
    lastStatus = res;

    statusMessage.edit({ embeds: [await getStatusEmbed(res)] });
  }
}

async function getStatusEmbed(
  res: JavaStatusResponse | undefined
): Promise<MessageEmbed> {
  const embed = new MessageEmbed();
  if (!res) {
    embed.setColor('#ff0000' as ColorResolvable);
    embed.setTitle('El servidor se encuentra cerrado :(');
    embed.setThumbnail(Justin.config.QyonaSvLogo);
    embed.setDescription(
      'Vuelve pronto! Estamos trabajando duro para que pronto vuelva a estar online!'
    );
    return embed;
  }

  embed.setColor('#00ff00' as ColorResolvable);
  embed.setTitle('Servidor abierto! :D');
  embed.setThumbnail(Justin.config.QyonaSvLogo);
  embed.setDescription(
    'Apresurate! Te estan esperando muchas aventuras dentro de las tierras de Qyona!'
  );
  embed.addField(
    'Aventureros activos',
    `${res.players.online}/${res.players.max}`
  );

  if (!res.players.sample || res.players.sample.length == 0) {
    return embed;
  }

  let userString = '';
  for (let it = 0; it < res.players.sample.length; it++) {
    userString += `${res.players.sample[it].name}`;
    if (it != res.players.sample.length - 1) userString += ', ';
  }

  embed.addField('Lista de Aventureros', userString);

  return embed;
}
