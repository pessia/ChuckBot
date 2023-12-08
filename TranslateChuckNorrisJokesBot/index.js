import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import iso6391 from "iso-639-1";
import { changeLanguage } from "./translateText.js";
import { listJokes } from "./dataService.js";
dotenv.config();
const line = await listJokes();
const TELEGRAM_BOT_API_KEY = process.env.TELEGRAM_BOT_API_KEY;
const telegramBot = new TelegramBot(TELEGRAM_BOT_API_KEY, { polling: true });
var langName;
var currentName = "en";
export async function detectLanguage(text) {
  var nameLan = iso6391.getCode(text);
  if (iso6391.validate(nameLan) == true) {
    currentName = nameLan;
    return currentName;
  }
  return "wrong";
}

telegramBot.onText(/set language (.+)/, (msg, match) => {
  langName = match[1];
  detectLanguage(langName).then((languageName) => {
    if (languageName == "wrong") {
      telegramBot.sendMessage(msg.chat.id, languageName);
    } else {
      changeLanguage("no problem", languageName).then((translated) => {
        telegramBot.sendMessage(msg.chat.id, translated);
      });
    }
  });
});

telegramBot.onText(/\d+/, (msg) => {
  const jokeNumber = msg.text;
  if (jokeNumber > 0 && jokeNumber < 102) {
    changeLanguage(line[jokeNumber - 1], currentName).then((translated) => {
      telegramBot.sendMessage(msg.chat.id, translated);
    });
  } else {
    const numWrong = "Wrong number";
    telegramBot.sendMessage(msg.chat.id, numWrong);
  }
});
