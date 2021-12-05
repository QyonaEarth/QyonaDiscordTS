import { Bot } from '../../domain/bot';

if (!process.env.will_token) {
  console.log('will_token not found!');
} else {
  const Will: Bot = new Bot(process.env.will_token, 'Will');
  Will.start();
}
