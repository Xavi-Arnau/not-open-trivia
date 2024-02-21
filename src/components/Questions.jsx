import { useContext, useEffect } from "react";
import SettingsContext from "../context/SettingsContext";
import ScoreContext from "../context/ScoreContext";
import Question from "./Question";
import Score from "./Score";

const Questions = ({ questions, newGame }) => {
  const { settings } = useContext(SettingsContext);
  const {
    points,
    updatePoints,
    updateUserAnswers,
    userAnswers,
    saveNewScore,
    pauseGame,
    playable,
  } = useContext(ScoreContext);

  useEffect(() => {
    //save score and pause the game
    const endGame = () => {
      //console.log("end game");
      //save score
      const score = {
        category: settings.category,
        number: settings.number,
        points: points,
        time: 300,
        difficulty: settings.difficulty,
      };
      saveNewScore(score);
      pauseGame();
    };
    //if there is an answer for each question the game is over
    if (Object.keys(userAnswers).length === +settings.number) {
      //ends the current game/round
      endGame();
    }
  }, [userAnswers, settings, points]);

  /**
   * @param {string} question
   * @param {bool} rightAnswer
   */
  const registerAnswer = (question, rightAnswer, answer) => {
    //console.log("click");
    /**
     * 1-mark the question as answered
     * 2-add points
     */
    //mark
    const update = {};
    update[question] = answer;
    updateUserAnswers(update);

    //correct answer
    if (rightAnswer) {
      updatePoints();
    }
  };
  return (
    <div className="bg-quiz">
      {!playable ? (
        <div className="new-game-box">
          <p>
            Game ended! Play a <button onClick={newGame}>New Game</button>
          </p>
        </div>
      ) : (
        ""
      )}

      <div className="board">
        <div className="container questions">
          {/* TODO #7
    /// Afegeix aquí un map sobre `questions` de tal manera que per cada element insereixi un
    /// component Question amb les propietats (key + 6) informades adequadament. */}
          {questions.map((question) => (
            <Question
              key={question.question}
              category={question.category}
              type={question.type}
              difficulty={question.difficulty}
              question={question.question}
              correctAnswer={question.correct_answer}
              incorrectAnswers={question.incorrect_answers}
              onClick={registerAnswer}
              answers={question.orderedAnswers}
            />
          ))}
        </div>
        <Score />
      </div>
    </div>
  );
};

export default Questions;
