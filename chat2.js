import { ChatApi } from "./api.js";
import { Chat } from "./chat-framework.js";

let context = [];

const api = await ChatApi();

async function handler(line) {
  context.push({ role: "user", content: line });
  const result = await api.complete(context);
  context.push(result);
  return result.content;
}

Chat(handler);
