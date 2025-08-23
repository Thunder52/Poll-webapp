import { useState } from "react";
import socket from "../../socket";
import { Outlet } from "react-router-dom";

export default function Teacher() {
  const [questionText, setQuestionText] = useState("");
    const [options, setOptions] = useState([
    { text: "", isCorrect: null },
  ]);

  const createQuestion = () => {
    socket.emit("createQuestion", {
      id: Date.now(),
      text: questionText,
      options: options
    });
    setQuestionText("");
    setOptions([{ text: "", isCorrect: null }]);
  };

  return (
    <Outlet context={{ questionText, setQuestionText, options, setOptions, createQuestion }} />
  );
}
