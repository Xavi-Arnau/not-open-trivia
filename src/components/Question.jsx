import ScoreContext from "../context/ScoreContext";

import { useContext } from "react";

const Question = ({
  category,
  type,
  difficulty,
  question,
  correctAnswer,
  incorrectAnswers,
  onClick,
  answers,
}) => {
  // TODO #6
  // Crea una variable `answers` que contingui un array amb totes les respostes (correctes + incorrectes).
  const { userAnswers } = useContext(ScoreContext);

  const sanitize = (text) =>
    text
      .replaceAll("&quot;", '"')
      .replaceAll("&#039;", "'")
      .replaceAll("&amp;", "&")
      .replaceAll("&deg;", "º")
      .replaceAll("&shy;", "\u00AD");

  const isRightAnswer = (answer) => {
    return !incorrectAnswers.includes(answer);
  };

  const isAlreadyAnswered = (question) => {
    if (userAnswers[question]) {
      return true;
    }
    return false;
  };

  //question = the question
  //answer = the answer we are iterating over
  //userAnswers[question] = hash table with the user selected answers
  //correctAnswer = the correct answer given by the api data
  const colorAnswers = (question, answer) => {
    //right answer, paint it green
    if (correctAnswer === answer) {
      return "answer green";
      //user given answer but wrong, paint it red
    } else if (userAnswers[question] === answer && correctAnswer !== answer) {
      return "answer red";
    }
    //wrong answer but not selected, paint it grey
    return "answer grey";
  };

  return (
    <div>
      <div className="card">
        <h2>{category}</h2>
        <p className="difficulty">{difficulty}</p>
        <p className="question">{sanitize(question)}</p>
        {answers.map((answer) =>
          isAlreadyAnswered(question) ? (
            <p key={answer} className={colorAnswers(question, answer)}>
              {sanitize(answer)}
            </p>
          ) : (
            <p
              onClick={() => onClick(question, isRightAnswer(answer), answer)}
              key={answer}
              className="answer"
            >
              {sanitize(answer)}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Question;
