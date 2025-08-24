import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.get("/health", (_req, res) => res.json({ ok: true }));

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_ORIGIN,
    methods: ["GET", "POST"],
  },
});

const students = {};

let activeQuestion = null;
let answers = [];
let resultTimeout = null;
let resultsEmitted = false;
const audienceCounts = () => ({
  totalStudents: Object.keys(students).length,
  totalAnswered: answers.length,
});

const allStudentsAnswered = () =>
  Object.keys(students).length > 0 &&
  answers.length === Object.keys(students).length;

const clearResultTimeout = () => {
  if (resultTimeout) clearTimeout(resultTimeout);
  resultTimeout = null;
};

const resetForNext = () => {
  activeQuestion = null;
  answers = [];
  resultsEmitted = false;
  clearResultTimeout();
  io.emit("canAskUpdate", { canAsk: true });
};

const computeResults = () => {
  const counts = {};
  if (activeQuestion?.options?.length) {
    for (const opt of activeQuestion.options) counts[opt.text] = 0;
  }
  for (const a of answers) {
    counts[a.option] = (counts[a.option] || 0) + 1;
  }
  return counts;
};

const emitResultsOnce = () => {
  if (resultsEmitted || !activeQuestion) return;
  resultsEmitted = true;

  const results = computeResults();
  io.emit("showResults", {
    question: {
      id: activeQuestion.id,
      text: activeQuestion.text,
      options: activeQuestion.options,
    },
    results,
    totalVotes: answers.length,
    totalStudents: Object.keys(students).length,
  });
  resetForNext();
};

io.on("connection", (socket) => {
  socket.on("join", (name) => {
    const safeName = String(name || "").trim() || `User-${socket.id.slice(0, 5)}`;
    students[socket.id] = { name: safeName, answered: false };
    io.emit("audienceUpdate", audienceCounts());
    io.emit("canAskUpdate", { canAsk: activeQuestion === null });
    if (activeQuestion) {
      socket.emit("newQuestion", activeQuestion);
    }
  });

  socket.on("createQuestion", (question) => {
    if (activeQuestion) {
      socket.emit("errorInfo", { message: "A question is already active." });
      return;
    }

    const text = String(question?.text || "").trim();
    const options = Array.isArray(question?.options) ? question.options : [];
    const timerSec = Number(question?.timer || 60);
    if (!text || options.length === 0) {
      socket.emit("errorInfo", { message: "Question text and options are required." });
      return;
    }
    answers = [];
    resultsEmitted = false;
    for (const sid in students) students[sid].answered = false;

    const durationMs = Math.min(Math.max(timerSec, 1), 300) * 1000; // clamp 1..300s
    const endTime = Date.now() + durationMs;

    activeQuestion = {
      id: question.id ?? Date.now(),
      text,
      options: options.map((o) => ({ text: String(o?.text ?? "") })),
      timer: Math.round(durationMs / 1000),
      endTime,
    };

    io.emit("newQuestion", activeQuestion);
    io.emit("canAskUpdate", { canAsk: false });
    io.emit("audienceUpdate", audienceCounts());
    clearResultTimeout();
    resultTimeout = setTimeout(() => {
      emitResultsOnce();
    }, durationMs);
  });
  socket.on("submitAnswer", ({ option }) => {
    if (!activeQuestion) return;

    const st = students[socket.id];
    if (!st || st.answered) return;

    const validOptions = new Set(activeQuestion.options.map((o) => o.text));
    const chosen = String(option || "");
    if (!validOptions.has(chosen)) return;

    st.answered = true;
    answers.push({ studentId: socket.id, option: chosen });
    io.emit("answerReceived", {
      student: st.name,
      ...audienceCounts(),
    });
    if (allStudentsAnswered()) {
      emitResultsOnce();
    }
  });
  socket.on("disconnect", () => {
    const existed = !!students[socket.id];
    if (existed) {
      delete students[socket.id];
      answers = answers.filter((a) => a.studentId !== socket.id);
      if (activeQuestion && allStudentsAnswered()) {
        emitResultsOnce();
      } else {
        io.emit("audienceUpdate", audienceCounts());
      }
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`CORS allowed origin: ${FRONTEND_ORIGIN}`);
});