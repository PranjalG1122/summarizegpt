# SummarizeGPT: A tool for summarizing text messages in a chatting application

Website link: [https://summarizegpt.vercel.app/](https://summarizegpt.vercel.app/)

## Introduction

This is a tool for summarizing text messages in a chatting application. It is
based on the
[GPT-3.5-turbo API](https://openai.com/blog/introducing-chatgpt-and-whisper-apis)
from OpenAI. The web application was written in [Next.js](https://nextjs.org/),
utilizing [Tailwind CSS](https://tailwindcss.com/) for styling and the web
application is hosted on [Vercel](https://vercel.com/). It works by sending the
text messages to the API, which then sents the messages in a prompt friendly
format to the OpenAI API endpoint. The endpoint returns a summarized paragraph
of all the messages, with only the important parts.

In this demo web app, users can add a custom username and message combination to
simulate a message on the rocket.chat application. The user can then click the
"Summarize" button to send the messages to the API and get a summarized version
of the messages. Ideally, in the production environment, the user can type a
command, such as `/summary` followed by an integer to specify the number of
messages to summarize or simply `/summary all` to summarize all the messages in
between when the user last logged off and when they last logged on.
