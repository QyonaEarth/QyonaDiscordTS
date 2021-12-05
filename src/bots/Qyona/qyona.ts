import {Bot} from '../../domain/bot'


if(!process.env.qyona_token){
    console.log('qyona_token not found!');
}
else{
    let Qyona :Bot = new Bot(process.env.qyona_token, 'Qyona');
    Qyona.start();
}
