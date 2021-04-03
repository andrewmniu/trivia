import React, { useState, useEffect } from "react";
import Question from "./Question.js";

export default function App() {
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((res) => {
        setQuestions(res.results);
      });
  }, []);

  return (
    <div>
      <h1>Hey, Launch! 👋</h1>
      {questions.map((question, idx) => (<Question question={question} key={idx}/>))}
    </div>
  );
}
