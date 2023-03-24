"use client";

import { useState } from "react";

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
      console.log(data.content);
    })
    .catch((err) => {
      console.error(err);
    });
}
export default function Home() {
  const [userText, setUserText] = useState("");
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
    <main>
      <input
        type="text"
        onChange={(e) => {
          setUserText(e.target.value);
        }}
      />
      <button
        onClick={() => {
          res(summaryMessages);
        }}
      >
        Click for gpt fun
      </button>
    </main>
  );
}
