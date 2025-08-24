import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// --- State ---
/** students: Map<socketId, { name: string, answered: boolean }> */
const students = {};
let activeQuestion = null; // { id, text, options, timer, endTime }
let answers = [];          // { studentId, option }
let resultTimeout = null;

// --- Helpers ---
const allStudentsAnswered = () =>
  Object.keys(students).length > 0 &&
  answers.length === Object.keys(students).length;

const resetForNext = () => {
  activeQuestion = null;
  answers = [];
  if (resultTimeout) {
    clearTimeout(resultTimeout);
    resultTimeout = null;
  }
  // Let teacher clients know they can ask a new question now
  io.emit("canAskUpdate", { canAsk: true });
};

const showResults = () => {
  if (!activeQuestion) return;

  // tally
  const counts = {};
  for (const opt of activeQuestion.options) counts[opt.text] = 0;
  for (const a of answers) counts[a.option] = (counts[a.option] || 0) + 1;

  io.emit("showResults", {
    question: { id: activeQuestion.id, text: activeQuestion.text, options: activeQuestion.options },
    results: counts,
    totalVotes: answers.length,
    totalStudents: Object.keys(students).length,
  });

  resetForNext();
};

// --- Sockets ---
io.on("connection", (socket) => {
  // student joins with a name
  socket.on("join", (name) => {
    students[socket.id] = { name, answered: false };
    // let teacher know current counts + whether they can ask
    io.emit("audienceUpdate", {
      totalStudents: Object.keys(students).length,
      totalAnswered: answers.length,
    });
    io.emit("canAskUpdate", { canAsk: activeQuestion === null });
    // if they join mid-question, send it to them so they see correct timer
    if (activeQuestion) {
      socket.emit("newQuestion", activeQuestion);
    }
  });

  // teacher creates a question
  socket.on("createQuestion", (question) => {
    if (activeQuestion) return; // ignore if one is already running

    // reset state
    answers = [];
    for (const sId in students) students[sId].answered = false;

    const durationMs = (question.timer || 60) * 1000;
    const endTime = Date.now() + durationMs;

    activeQuestion = { ...question, endTime }; // store authoritative endTime

    io.emit("newQuestion", activeQuestion);
    io.emit("canAskUpdate", { canAsk: false });

    // automatic results when time is up
    resultTimeout = setTimeout(() => {
      if (activeQuestion) showResults();
    }, durationMs);
  });

  // student submits answer
  socket.on("submitAnswer", ({ option }) => {
    if (!activeQuestion) return;
    const st = students[socket.id];
    if (!st || st.answered) return; // already answered or unknown

    st.answered = true;
    answers.push({ studentId: socket.id, option });

    io.emit("answerReceived", {
      student: st.name,
      totalAnswered: answers.length,
      totalStudents: Object.keys(students).length,
    });

    if (allStudentsAnswered()) {
      showResults(); // ends early if everyone answered
    }
  });

  socket.on("disconnect", () => {
    const wasStudent = students[socket.id];
    delete students[socket.id];

    // remove their answer if any
    if (wasStudent) {
      answers = answers.filter(a => a.studentId !== socket.id);
      if (activeQuestion && allStudentsAnswered()) {
        showResults();
      } else {
        io.emit("audienceUpdate", {
          totalStudents: Object.keys(students).length,
          totalAnswered: answers.length,
        });
      }
    }
  });
});

httpServer.listen(5000, () => {
  console.log("Server started on port 5000");
});