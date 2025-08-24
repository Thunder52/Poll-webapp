import { useEffect, useState, useRef } from "react";
import socket from "../socket";
import StudentJoinPage from "./StudentJoinPage";
import StudentLoadingPage from "./StudentLoadingPage";
import QuestionPage from "./QuestionPage";
import ResultPage from "./ResultPage";

function Student() {
  const [name, setName] = useState(localStorage.getItem("student_name") || "");
  const [joined, setJoined] = useState(!!name);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState("");
  const [results, setResults] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const questionNumber = useRef(0);

  useEffect(() => {
    if (joined) {
      localStorage.setItem("student_name", name);
      socket.emit("join", name);
    }

    socket.on("newQuestion", (q) => {
      setQuestion(q);
      setSelected("");
      setResults(null);
      setSubmitted(false);
    });

    socket.on("showResults", (data) => {
      setResults(data);
      setQuestion(null);
    });

    return () => {
      socket.off("newQuestion");
      socket.off("showResults");
    };
  }, [joined, name]);

  const submitAnswer = () => {
    if (!selected) {
      alert("Please select an option first!");
      return;
    }
    if (submitted) return;
    setSubmitted(true);
    socket.emit("submitAnswer", { option: selected });
  };

  if (!joined) {
    return (
      <StudentJoinPage name={name} setName={setName} setJoined={setJoined} />
    );
  }

  return (
    <div>
      {question ? (
        <QuestionPage
          question={question}
          setSelected={setSelected}
          submitanswer={submitAnswer}
          selected={selected}
          submitted={submitted}
          QuestionNumber={questionNumber.current}
        />
      ) : results ? (
        <ResultPage questionData={results} role="student" />
      ) : (
        <StudentLoadingPage />
      )}
    </div>
  );
}

export default Student;