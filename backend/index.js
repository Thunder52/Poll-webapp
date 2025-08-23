import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
app.use(cors());

const httpServer = createServer(app);

let students = [];
let activeQuestions = null;
let answers = [];

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", (name) => {
    students[socket.id] = { name, answered: false };
  });
  socket.on("createQuestion", (question) => {
    activeQuestions = question;
    answers = [];
    for (let s in students) {
      students[s].answered = false;
    }
    io.emit("newQuestion", question);

    setTimeout(() => {
      if (activeQuestions) {
        showResult();
      }
    }, 60000);
  });

  socket.on("submitAnswer", (data) => {
    if (!activeQuestions || students[socket.id]?.answered) return;
    answers.push({ studentsId: socket.id, option: data.option });
    io.emit("answerRecieved", {
      student: students[socket.id].name,
      totalAnswered: answers.length,
      totalStudents: Object.keys(students).length,
    });
    if (answers.length === Object.keys(students).length) {
      showResult();
    }
  });
  socket.on("disconnect", () => {
    delete students[socket.id];
  });
 function showResult() {
  if (!activeQuestions) return;

  const counts = {};
  for (let opt of activeQuestions.options) {
    counts[opt.text] = 0;
  }
  for (let a of answers) {
    counts[a.option] = (counts[a.option] || 0) + 1;
  }

  io.emit("showResults", { question: activeQuestions, results: counts });
  activeQuestions = null;
}
});

httpServer.listen(5000,()=>{
    console.log("Server started on port 5000");
})