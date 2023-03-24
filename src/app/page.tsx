"use client";

import { useState } from "react";

interface messageProps {
  id: number;
  username: string;
  message: string;
}

export default function Home() {
  const [summarizedMessage, setSummarizedMessage] = useState<string>("");
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
  const [allMessages, setAllMessages] = useState<messageProps[]>([
    {
      id: 1,
      username: "Jane",
      message:
        "There is an important meeting on the 9th at 2pm IST. My cat just had kittens.",
    },
    {
      id: 2,
      username: "Joey",
      message:
        "There is an important seminar on the 10th at 5pm IST. I'm going to the movies tonight.",
    },
  ]);
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");

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
      {allMessages.map((message, index) => {
        return (
          <div className="flex flex-col items-start rounded p-4 bg-slate-700 text-white w-full">
            <h1 className="font-semibold text-xl">{message.username}</h1>
            <p key={index} className="text-lg">
              - {message.message}
            </p>
          </div>
        );
      })}
      <div className="flex flex-col gap-2 items-start bg-slate-700 w-full p-4 rounded">
        <input
          type="text"
          className="bg-slate-600 px-1 py-0.5 text-white placeholder:text-slate-400 rounded w-96"
          placeholder="Enter a test username"
          maxLength={20}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        />
        <input
          type="text"
          className="bg-slate-600 px-1 py-0.5 text-white placeholder:text-slate-400 rounded w-full"
          placeholder="Enter a test message"
          maxLength={60}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
        />
        <button
          className="bg-slate-600 px-2 py-1 font-semibold hover:bg-slate-500 transition-colors rounded text-white mx-auto"
          onClick={() => {
            setAllMessages([
              ...allMessages,
              {
                id: allMessages.length + 1,
                username: username,
                message: message,
              },
            ]);
            setUsername("");
            setMessage("");
          }}
        >
          Add Message to Summarize
        </button>
      </div>
      <button
        onClick={() => {
          setLoadingMessages(true);
          res(allMessages);
        }}
        disabled={loadingMessages}
        className="bg-slate-700 px-2 py-1 font-semibold hover:bg-slate-600 transition-colors rounded text-white mx-auto"
      >
        {loadingMessages ? "Loading..." : "Summarize"}
      </button>
      {(summarizedMessage && (
        <div className="flex flex-col border-4 border-slate-600 items-center text-white rounded bg-slate-700 p-2 gap-2">
          <h1 className="text-xl font-semibold">Summarized Message</h1>
          <p className="text-lg">{summarizedMessage}</p>
        </div>
      )) || <></>}
    </main>
  );
}
