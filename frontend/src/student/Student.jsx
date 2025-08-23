import { useEffect, useState } from "react";
import socket from "../socket";
import StudentJoinPage from "./StudentJoinPage";
import StudentLoadingPage from "./StudentLoadingPage";

export default function Student() {
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(!!name);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState("");
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (joined) socket.emit("join", name);

    socket.on("newQuestion", (q) => {
      setQuestion(q);
      setSelected("");
      setResults(null);
    });

    socket.on("showResults", (data) => {
      setResults(data.results);
      setQuestion(null);
    });

    return () => {
      socket.off("newQuestion");
      socket.off("showResults");
    };
  }, [joined, name]);

  const submitAnswer = () => {
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
        <div>
          <h3>{question.text}</h3>
          {question.options.map((opt, index) => (
            <label key={index} style={{ display: "block", margin: "8px 0" }}>
              <input
                type="radio"
                value={opt.text}
                checked={selected === opt.text}
                onChange={() => setSelected(opt.text)}
              />
              {opt.text}
            </label>
          ))}
          <button disabled={!selected} onClick={submitAnswer}>
            Submit
          </button>
        </div>
      ) : results ? (
        <div>
          <h3>Results</h3>
          {Object.entries(results).map(([opt, count]) => (
            <p key={opt}>
              {opt}: {count}
            </p>
          ))}
        </div>
      ) : (
        <StudentLoadingPage />
      )}
    </div>
  );
}
