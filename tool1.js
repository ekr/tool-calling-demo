import { ChatApi } from "./api.js";
import { Chat } from "./chat-framework.js";
import { Tools } from "./tools.js";

let context = [];

function call_tool(call) {
  if (Tools.implementations[call.name]) {
    console.log(
      `+++ Calling tool '${call.name}' with arguments ${JSON.stringify(call.arguments)}`,
    );
    const result = Tools.implementations[call.name](call.arguments);
    console.log(`--> ${JSON.stringify(result)}`);
    return result;
  } else {
    throw new Error(`Missing tool ${call.name}`);
  }
}

const api = await ChatApi({ tools: Tools.definitions });

async function handler(line) {
  context.push({ role: "user", content: line });
  let response = null;

  for (;;) {
    response = await api.complete(context);
    if (!response.tool_calls?.length) {
      break;
    }

    context.push(response.tool_calls[0]);

    const tool_result = call_tool(response.tool_calls[0]["function"]);

    context.push({
      role: "tool",
      id: response.tool_calls[0].id,
      content: tool_result,
    });
  }

  context.push(response);
  return response.content;
}

Chat(handler);
