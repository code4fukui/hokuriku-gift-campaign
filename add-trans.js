import { CSV } from "https://js.sabae.cc/CSV.js";
import { fetchChat } from "https://code4fukui.github.io/ai_chat/fetchChat.js";

const data = await CSV.fetchJSON("all.csv");
for (const item of data) {
  //console.log(item);
  const name = "推奨度の理由(旅行)";
  const s = item[name].trim();
  if (s) {
    const ja = await fetchChat("下記を日本語に翻訳して\n" + s);
    item[name + "_ja"] = ja;
    console.log(s, ja);
  }
}
await Deno.writeTextFile("all_ja.csv", CSV.stringify(data));
