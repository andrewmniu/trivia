import { useState, useEffect } from "react";
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
  const [answers, setAnswers] = useState([]);
  const [answered, setAnswered] = useState(false);

  useEffect(() => setAnswers(createAnswers(question)), []);

  const createAnswers = (question) => {
    let answers = [[question.correct_answer, 1]];
    for (let answer of question.incorrect_answers) {
      answers.push([answer, 0]);
    }
    shuffle(answers);
    return answers;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnswered(true);
  };

  return (
    <>
      <h1>{question.question}</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        {answers.map((answer, idx) => (
          <>
            {answer[1] ? (
              <p style={{ color: "green" }} hidden={!answered}>
                Correct!
              </p>
            ) : (
              <p style={{ color: "red" }} hidden={!answered}>
                Incorrect.
              </p>
            )}
            <input
              type="radio"
              id={idx}
              name={`Question ${key}`}
              disabled={answered}
            />
            <label for={idx}> {answer[0]} </label>
            <br />
          </>
        ))}
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default Question;
