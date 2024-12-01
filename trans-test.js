import { fetchChat } from "https://code4fukui.github.io/ai_chat/fetchChat.js";

const q = "下記を翻訳して\n好";
const res = await fetchChat(q);
console.log(res);
