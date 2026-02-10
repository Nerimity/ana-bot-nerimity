import Groq from "groq-sdk";
import config from "./config.js";

/**
 * @type {Groq}
 */
const groq = config.groqApiKey ? new Groq({ apiKey: config.groqApiKey }) : {};

export async function getGroqChatCompletion(message) {
  const res = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Try to respond shorter than 800 letters. Your name is ana, from the video game overwatch.",
      },
      {
        role: "user",
        content: message,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  const content = res.choices[0]?.message?.content || "";
  if (content.length >= 1999) {
    return content.slice(0, 1996) + "...";
  }
  return content;
}

/**
 *
 * @param {({content: string, role: "user" | "assistant"})[]} messages
 * @returns
 */
export async function getGroqChatCompletionFromMessages(messages) {
  const res = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Try to respond shorter than 800 letters. Your name is ana, from the video game overwatch.",
      },
      ...messages,
    ],
    model: "llama-3.3-70b-versatile",
  });

  const content = res.choices[0]?.message?.content || "";
  if (content.length >= 1999) {
    return content.slice(0, 1996) + "...";
  }
  return content;
}
