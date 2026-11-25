const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let feedbacks = [
  { id: 1, name: "Workshop Team", message: "Backend is connected! Now wire up the POST route." },
];
let nextId = 2;

// 1. GET all feedback (Already working!)
app.get("/api/feedback", (req, res) => {
  res.status(200).json(feedbacks);
});

// 2. POST new feedback
app.post("/api/feedback", (req, res) => {
  const { name, message } = req.body;

  if (!name){
    return res.status(400).json({ error: "Name is required" });
  }
  if ((!message)||(message.length<5)){
    return res.status(400).json({ error: "Message must be at least 5 characters" })
  }

  const newFeedback = {
    id: nextId++,
    name: name.trim(),
    message: message || "Created on Express backend",
  };

  feedbacks.unshift(newFeedback);
  res.status(201).json(newFeedback);

  // TODO 1 (Validation Twist):
  // - If `name` is empty, return 400 with { error: "Name is required" }
  // - If `message` is missing or shorter than 5 characters, return 400 with { error: "Message must be at least 5 characters" }

  // TODO 2 (Save & Respond):
  // - Create a newFeedback object { id: nextId++, name, message }
  // - Add it to the top of `feedbacks` using .unshift()
  // - Return status 201 with the newFeedback JSON
});

app.listen(PORT, () => {
  console.log(`Feedback API running at http://localhost:${PORT}`);
});