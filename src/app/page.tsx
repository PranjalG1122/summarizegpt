"use client";

import { useState } from "react";

interface messageProps {
  id: number;
  username: string;
  message: string;
}

export default function Home() {
  const VALID_USERNAME = /^[a-zA-Z0-9_]{4,20}$/;
  const [summarizedMessage, setSummarizedMessage] = useState<string>("");
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
  const [allMessages, setAllMessages] = useState<messageProps[]>([
    {
      id: 1,
      username: "John_Doe",
      message:
        "There is an important meeting on the 13/04/2023 at 2pm IST. My cat just had kittens.",
    },
  ]);
  const [inputUsername, setInputUsername] = useState<string>("");
  const [inputMessage, setInputMessage] = useState<string>("");

  async function res(prompt: any) {
    if (!prompt || allMessages.length === 0) {
      alert("Enter a message to summarize");
      setLoadingMessages(false);
      return;
    }
    prompt.forEach((message: any) => {
      if (!VALID_USERNAME.test(message.username)) {
        alert(
          "Invalid username. Username must be between 4 and 20 characters long and can only contain alphanumeric characters and underscores."
        );
        setLoadingMessages(false);
        return;
      }
    });
    await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
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
    <main className="flex flex-col gap-6 items-center justify-center min-h-screen w-full max-w-[72rem] mx-auto px-4 my-10">
      <h1 className="text-2xl font-semibold text-white">SummarizeGPT</h1>
      <p className="lg:text-lg text-base text-white">
        This web app uses the OpenAI ChatGPT 3.5-Turbo API to summarize any
        previous messages sent by other uses in a simulated chat program.
        Clicking 'Summarize Messages' will return a short and informative
        paragraph containing pertinent information, such as important meetings,
        dates, timings and more. Test out the summary bot demo by entering a
        custom username and a custom message and click 'Summarize'.
      </p>
      <span className="text-white">
        OpenAI API Summarize Bot by{" "}
        <a
          href="https://pranjalg420.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-400 transition-colors"
        >
          Pranjal Gupta
        </a>
      </span>
      {allMessages.map(({ username, message, id }) => {
        return (
          <div
            key={id}
            className="flex flex-col items-start gap-2 rounded p-4 bg-slate-700 text-white w-full"
          >
            <h1 className="font-semibold lg:text-xl text-lg">{username}</h1>
            <p className="lg:text-lg text-base">- {message}</p>
            <button
              className="bg-slate-900 px-2 py-1 font-semibold hover:bg-slate-800 transition-colors rounded text-white"
              onClick={() => {
                setAllMessages(
                  allMessages.filter((message) => message.id !== id)
                );
              }}
            >
              Remove
            </button>
          </div>
        );
      })}
      <div className="flex flex-col gap-2 items-start bg-slate-700 w-full p-4 rounded">
        <input
          type="text"
          className="bg-slate-600 px-1 py-0.5 text-white placeholder:text-slate-400 rounded w-"
          placeholder="Enter a test username"
          maxLength={20}
          onChange={(e) => {
            setInputUsername(e.target.value);
          }}
          value={inputUsername}
        />
        <input
          type="text"
          className="bg-slate-600 px-1 py-0.5 text-white placeholder:text-slate-400 rounded w-full"
          placeholder="Enter a test message"
          maxLength={120}
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          value={inputMessage}
        />
        <button
          className="bg-slate-600 px-2 py-1 font-semibold hover:bg-slate-500 transition-colors rounded text-white mx-auto"
          onClick={() => {
            if (allMessages.length >= 5) {
              alert("You can only add 5 text messages to the list.");
              return;
            }
            setAllMessages([
              ...allMessages,
              {
                id: allMessages.length + 1,
                username: inputUsername,
                message: inputMessage,
              },
            ]);
            setInputUsername("");
            setInputMessage("");
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
