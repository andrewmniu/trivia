import React from "react";
import PropTypes from "prop-types";

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

const Question = ({ question, key }) => {
  const createAnswers = (question) => {
    let answers = [question.correct_answer];
    for (let answer of question.incorrect_answers) {
      answers.push(answer);
    }
    shuffle(answers);
    return answers;
  };

  return (
    <>
      <h1>{question.question}</h1>
      {createAnswers(question).map((answer, idx) => (
        <>
          <input type="radio" id={idx} name={`Question ${key}`}></input>
          <label for={idx}> {answer} </label>
          <br />
        </>
      ))}
      <input type="submit" value="Submit" />
      <form></form>
    </>
  );
};

export default Question;
