// **************************************************************************************************
// Подключаемые модули
// ==================================================================================================

const TelegramBot = require('node-telegram-bot-api'); // Подключаем фреймворк бота
const Agent = require('socks5-https-client/lib/Agent'); // Обход блокировки через SOCKS5
const process = require('process'); // Нативный модуль node.js
const fs = require('fs'); // Нативный модуль node.js
const token = require('./js/preferences.js'); // Модуль с c SOCS5 портами и токеном
const data = require('./js/data.js'); // Модуль с данными
const utils = require('./js/utils.js'); // Модуль с универсальными функциями

// **************************************************************************************************
// Создание нового бота
// ==================================================================================================

const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN, {
  polling: true,
  request: {
    agentClass: Agent,
    agentOptions: {
      socksHost: process.env.PROXY_SOCKS5_HOST,
      socksPort: parseInt(process.env.PROXY_SOCKS5_PORT),
      // Если есть регистрация на хосте
      // socksUsername: process.env.PROXY_SOCKS5_USERNAME,
      // socksPassword: process.env.PROXY_SOCKS5_PASSWORD,
    }
  }
});

console.log('БОТ ЗАПУЩЕН...');

// **************************************************************************************************
// Функции бота
// ==================================================================================================

// Вкидывает мем с колобком по команде /yoba
bot.onText(/\/yoba/, (msg) => {
  const chatId = msg.chat.id;
  let img = utils.getRandomElement(data.yobaPictures);

  bot.sendPhoto(chatId, img);
});

// Инлайновый(https://core.telegram.org/bots/api#inline-mode) бот предлагает выбрать мем для отправки в чат
bot.on('inline_query', query => {
  let imagesArray = data.yobaPictures;
  let maxImagesPush = 6;
  let usedImagesForRandom = [];

  for (let i = 0; i < maxImagesPush; i++) {
    randomImage(imagesArray);
  }

  //Получаем в функцию массив
  function randomImage(sourceArr) {
    let randomIndex = Math.floor(Math.random() * sourceArr.length);
    let picture = {
      type: 'photo',
      id: randomIndex.toString(),
      photo_url: sourceArr[randomIndex],
      thumb_url: sourceArr[randomIndex],
    };

    //Проверяем совпадает ли случайное число с числом которое уже было добавлено в id объекта
    for (let i = 0; i < usedImagesForRandom.length; i++) {
      if (randomIndex.toString() === usedImagesForRandom[i].id) {
        return randomImage(sourceArr);
      }
    }

    //Добавляем новое число в массив проверки
    return usedImagesForRandom.push(picture);
  }
  console.log('Кидаю ЙОБУ');
  bot.answerInlineQuery(query.id, usedImagesForRandom, {
    cache_time: 0 // Оптимизация производительности
  });
});

// Закинуть картинку прямо с папки

bot.onText(/\/test/, (msg) => {
  const chatId = msg.chat.id;
  let pic = fs.readFileSync(__dirname + '/img/PeKa/yoba.min.jpg');

  bot.sendPhoto(chatId, pic);
});
