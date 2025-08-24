import { useEffect, useState } from "react";
import socket from "../socket";
import CreateQuestion from "./CreateQuestion";
import ResultPage from "../student/ResultPage";
import TeacherLoadingPage from "./TeacherLoadingPage"; // create a simple "Waiting for answers..." component

export default function Teacher() {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([{ text: "", isCorrect: null }]);
  const [timer, setTimer] = useState(60);
  const [view, setView] = useState("create"); // create | waiting | results
  const [question, setQuestion] = useState(null);
  const [results, setResults] = useState(null);
  const [canAsk, setCanAsk] = useState(true);
  const [liveCounts, setLiveCounts] = useState({ totalStudents: 0, totalAnswered: 0 });

  const createQuestion = () => {
    if (!canAsk) return; // prevent asking while active
    const newQuestion = { id: Date.now(), text: questionText, options, timer };
    socket.emit("createQuestion", newQuestion);
    setQuestionText("");
    setOptions([{ text: "", isCorrect: null }]);
  };

  useEffect(() => {
    socket.on("newQuestion", (q) => {
      setQuestion(q);
      setResults(null);
      setView("waiting");
    });

    socket.on("showResults", (data) => {
      setResults(data);
      setQuestion(null);
      setView("results");
    });

    socket.on("canAskUpdate", ({ canAsk }) => setCanAsk(canAsk));
    socket.on("audienceUpdate", (counts) => setLiveCounts(counts));
    socket.on("answerReceived", (counts) => setLiveCounts(counts));

    return () => {
      socket.off("newQuestion");
      socket.off("showResults");
      socket.off("canAskUpdate");
      socket.off("audienceUpdate");
      socket.off("answerReceived");
    };
  }, []);

  return (
    <div>
      {view === "create" && (
        <CreateQuestion
          questionText={questionText}
          setQuestionText={setQuestionText}
          options={options}
          setOptions={setOptions}
          timer={timer}
          setTimer={setTimer}
          createQuestion={createQuestion}
          canAsk={canAsk}
          liveCounts={liveCounts}
        />
      )}

      {view === "waiting" && (
        <TeacherLoadingPage
          question={question}
          liveCounts={liveCounts}
        />
      )}

      {view === "results" && (
        <ResultPage
          questionData={results}
          role="teacher"
          handler={() => setView("create")}
        />
      )}
    </div>
  );
}
