"use client";

import { useState } from "react";

export default function Home() {
  const [summarizedMessage, setSummarizedMessage] = useState<string>("");
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);

  async function res(prompt: object) {
    await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSummarizedMessage(data.content);
        setLoadingMessages(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const summaryMessages = [
    {
      username: "John",
      messages: [
        "There is an important meeting on the 7th at 10pm IST.",
        "What's the agenda? for today's meeting?",
      ],
    },
    {
      username: "Jane",
      messages: [
        "There is an important meeting on the 9th at 2pm IST.",
        "My cat just had kittens",
      ],
    },
    {
      username: "Joey",
      messages: [
        "There is an important seminar on the 10th at 5pm IST.",
        "I'm going to the movies tonight",
      ],
    },
  ];

  return (
    <main className="flex flex-col gap-6 items-center justify-center min-h-screen w-full max-w-[72rem] mx-auto my-10">
      <h1 className="text-2xl font-semibold text-white">SummarizeGPT</h1>
      <p className="text-lg text-white">
        This web app uses the OpenAI ChatGPT 3.5-Turbo API to summarize any
        previous messages sent by other uses in a simulated chat program.
        Clicking 'Summarize Messages' will return a short and informative
        paragraph containing pertinent information, such as important meetings,
        dates, timings and more.
      </p>
      {summaryMessages.map((message) => {
        return (
          <div className="flex flex-col items-start rounded p-4 bg-slate-700 text-white w-full">
            <h1 className="font-semibold text-xl">{message.username}</h1>
            <ul>
              {message.messages.map((message: string, index: number) => {
                return (
                  <li key={index} className="text-lg">
                    - {message}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      <div className="flex flex-row w-full gap-4">
        <input
          type="text"
          className="bg-slate-700 px-1 py-0.5 text-white placeholder:text-slate-400 rounded w-full"
          placeholder="Enter your message here..."
        />
        <button
          onClick={() => {
            setLoadingMessages(true);
            res(summaryMessages);
          }}
          disabled={loadingMessages}
          className="bg-slate-700 px-2 py-1 font-semibold hover:bg-slate-600 transition-colors rounded text-white"
        >
          {loadingMessages ? "Loading..." : "Summarize"}
        </button>
      </div>
      <div className="flex flex-col border-4 border-slate-600 items-center text-white rounded bg-slate-700 p-2 gap-2">
        <h1 className="text-xl font-semibold">Summarized Message</h1>
        <p className="text-lg">
          {summarizedMessage}
        </p>
      </div>
    </main>
  );
}
