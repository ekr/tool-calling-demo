import fetch from "node-fetch";

const server_url = "http://localhost:11434";
const g_chat_url = `${server_url}/api/chat`;
const g_model = process.env.AGENT_MODEL || "mistral-small";

export async function ChatApi({
  endpoint_url = g_chat_url,
  model = g_model,
  tools = [],
} = {}) {
  const verbose = !!process.env.VERBOSE;
  async function complete(messages) {
    const body = {
      model: model,
      stream: false,
      tools,
      messages,
    };

    if (verbose) {
      console.log("REQUEST:", JSON.stringify(body, null, 2));
    }

    const response = await fetch(endpoint_url, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const json = await response.json();

    if (verbose) {
      console.log("RESPONSE:", JSON.stringify(json, null, 2));
    }

    return json.message;
  }

  return {
    complete,
  };
}
