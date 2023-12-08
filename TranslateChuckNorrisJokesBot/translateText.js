import axios from "axios";
import { randomUUID } from "crypto";
const apiKey = "1a1c28a58ee048caaf87168e6ce7cca3";
const endpoint = "https://api.cognitive.microsofttranslator.com";
const region = "northeurope";

export async function changeLanguage(text, languageName) {
  try {
    return await dataTranslation(text, languageName);
  } catch (ex) {
    console.log(ex);
  }
}

async function dataTranslation(text, languageName) {
  let params = new URLSearchParams();
  params.append("api-version", "3.0");
  params.append("from", "en");
  params.append("to", languageName);
  params.append("includeSentenceLength; charset=UTF-8", "true");

  var response = await axios({
    baseURL: endpoint,
    url: "/translate",
    method: "post",
    headers: {
      "Ocp-Apim-Subscription-Key": apiKey,
      "Ocp-Apim-Subscription-Region": region,
      "Content-type": "application/json; charset=UTF-8",
      "X-ClientTraceId": randomUUID().toString(),
    },
    params: params,
    data: [
      {
        text: text,
      },
    ],
    responseType: "json",
  });
  return response.data[0].translations[0].text;
}
