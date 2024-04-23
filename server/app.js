const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const leaders = [
  { id: 1, name: "Peter Thomas", speed: 226.5 },
  { id: 2, name: "Michael Scott", speed: 220.4 },
  { id: 3, name: "Dwight Schrute", speed: 216.5 },
  { id: 4, name: "Jim Halpert", speed: 216.0 },
  { id: 5, name: "Stanley Hudson", speed: 212.2 },
  { id: 6, name: "Angela Martin", speed: 210.6 },
  { id: 7, name: "Kevin Malone", speed: 205.5 },
  { id: 8, name: "Toby Flenderson", speed: 204.0 },
  { id: 9, name: "Creed Bratton", speed: 201.5 },
  { id: 10, name: "Pam Beesley", speed: 200.3 },
];

app.get("/", (req, res) => {
  return res.send("API Works!");
});

app.get("/sse", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
    Connection: "keep-alive", // allowing TCP connection to remain open for multiple HTTP requests/responses
    "Content-Type": "text/event-stream", // media type for Server Sent Events (SSE)
  });
  res.flushHeaders();

  const interval = setInterval(() => {
    leaders.forEach(leader => {
      leader.speed = 100 + Math.round(Math.random() * 100);
    });

    const data = leaders.sort((a, b) => b.speed - a.speed);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 2000);

  res.on("close", () => {
    clearInterval(interval);
    res.end();
  });
});

app.listen(port, () => console.log(`API is listening on ${port}`));
