import React, { useState, useEffect } from "react";

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default function App() {
  const [questions, setQuestions] = useState([]);

  const createQuestion = (question) => {
    let answers = [question.correct_answer];
    for (let answer of question.incorrect_answers) {
      answers.push(answer);
    }
    console.log(answers);
    shuffle(answers);
    console.log(answers);
    return <h1>{question.question}</h1>;
  };
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
      {questions.map((question) => createQuestion(question))}
    </div>
  );
}
