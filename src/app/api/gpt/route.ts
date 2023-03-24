import { Configuration, OpenAIApi } from "openai";

export async function POST(request: Request, response: Response) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const body = JSON.parse(await request.text()).prompt.map(
    ({ username, messages }: { username: string; messages: string[] }) => {
      return {
        role: "user",
        name: username,
        content: `${username}: ${messages.join("\n")}`,
      };
    }
  );

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are summarizeGPT. You summarize messages into a concise and informative paragraph containing only important information from other users and ignore anything irrelevant .",
      },
      ...body,
      {
        role: "system",
        content: "Summarize the above messages into a single paragraph.",
      },
    ],
  });
  console.log(completion.data.choices[0].message);
  return new Response(JSON.stringify(completion.data.choices[0].message));
}
