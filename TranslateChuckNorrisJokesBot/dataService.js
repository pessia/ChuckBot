import axios from "axios";
import cheerio from "cheerio";

const url = "https://parade.com/968666/parade/chuck-norris-jokes/";

export const listJokes = async () => {
  var response = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.8",
      Referer: "https://www.google.com/",
      Connection: "keep-alive",
    },
  });
  const html = response.data;
  const $ = cheerio.load(html);
  const listLine = $(".m-detail--body ol li");
  return listLine.map((index, element) => $(element).text()).get();
};
