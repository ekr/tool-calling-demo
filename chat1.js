import { ChatApi } from "./api.js";
import { Chat } from "./chat-framework.js";

const api = await ChatApi();

async function handler(line) {
  const result = await api.complete([{ role: "user", content: line }]);
  return result.content;
}

Chat(handler);
