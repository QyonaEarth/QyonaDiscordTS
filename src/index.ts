import { Bot } from './domain/bot';
import 'dotenv/config';

let Qyona: Bot;
let Will: Bot;
let Justin: Bot;

if (
  !process.env.qyona_token ||
  !process.env.will_token ||
  !process.env.justin_token
) {
  console.log('bot_token not found!');
} else {
  Qyona = new Bot(process.env.qyona_token, 'Qyona');
  Qyona.start();
  Justin = new Bot(process.env.justin_token, 'Justin');
  Justin.start();
  Will = new Bot(process.env.will_token, 'Will');
  Will.start();
}
