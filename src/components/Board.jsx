import { useContext, useEffect, useState } from "react";
import SettingsContext from "../context/SettingsContext";
import ScoreContext from "../context/ScoreContext";
import Questions from "./Questions";

const Board = () => {
  const [questions, setQuestions] = useState([]);
  const [games, setGames] = useState(1);
  const { settings, categories } = useContext(SettingsContext);
  const { startNewGame } = useContext(ScoreContext);
  const apiUrl = "https://opentdb.com/api.php?type=multiple";

  // TODO #0
  // No cal que facis res. Però assegura't que entens què fa aquest hook. Si no, pregunta al fòrum!
  // Cal que ho entenguis perfectament línia a línia sense el més mínim dubte.
  useEffect(() => {
    const fetchData = async () => {
      const filterNumber = "&amount=" + settings.number;
      const filterCategory = "&category=" + categories[settings.category];
      const filterDifficulty =
        "&difficulty=" + settings.difficulty.toLowerCase();
      const response = await fetch(
        `${apiUrl}${filterNumber}${filterCategory}${filterDifficulty}`
      );
      const data = await response.json();
      data.results.forEach((question) => {
        question.orderedAnswers = [
          question.correct_answer,
          ...question.incorrect_answers,
        ].sort((a, b) => 0.5 - Math.random());
      });
      //console.log(data);
      //console.log("data fetched!!");
      setQuestions(data.results);
    };

    fetchData();
  }, [settings, categories, games]);

  //keep track of the games with a game counter
  const newGame = () => {
    startNewGame();
    setGames(games + 1);
  };

  return <Questions questions={questions} newGame={newGame} />;
};

export default Board;
