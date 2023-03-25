import { Configuration, OpenAIApi } from "openai";

export async function POST(request: Request, response: Response) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const body = JSON.parse(await request.text()).prompt.map(
    ({ username, message }: { username: string; message: string }) => {
      return {
        role: "user",
        name: username,
        content: `${username}: ${message}`,
      };
    }
  );

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 1000,
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
  } catch (e) {
    return new Response(JSON.stringify("error"));
  }
}
