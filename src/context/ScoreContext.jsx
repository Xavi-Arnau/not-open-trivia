import { createContext, useState } from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  //points state to save the current points
  const [points, setPoints] = useState(0);
  //time state to time the game
  const [time, setTime] = useState(0);
  //hash table to keep count of the user answers
  const [userAnswers, setUserAnswers] = useState({});
  //boolen status to have a post game before reloading
  const [playable, setPlayable] = useState(true);
  const SAVEDSCORES = "savedScores";

  //increment points by 1
  const updatePoints = () => {
    setPoints(points + 1);
  };

  //update the answers hash table
  const updateUserAnswers = (newAnswer) => {
    setUserAnswers({ ...userAnswers, ...newAnswer });
  };
  //freeze the game by setting playable status to false
  const pauseGame = () => {
    setPlayable(false);
  };
  //clean the answers hash table, set points to 0, set time to 0 and unfreeze the game
  const startNewGame = () => {
    setUserAnswers({});
    setPoints(0);
    setTime(0);
    setPlayable(true);
  };

  //if the is no previous records saved we save some dummy ones
  const initSavedScores = () => {
    //console.log("initSavedScores");
    //console.log(savedScores);

    const defaultScores = [
      {
        category: "Sports",
        number: 8,
        points: 3,
        time: 555,
        difficulty: "Easy",
      },
      {
        category: "History",
        number: 6,
        points: 0,
        time: 400,
        difficulty: "Easy",
      },
      {
        category: "Sports",
        number: 6,
        points: 5,
        time: 333,
        difficulty: "Easy",
      },
      {
        category: "Geography",
        number: 8,
        points: 1,
        time: 250,
        difficulty: "Easy",
      },
      {
        category: "Geography",
        number: 6,
        points: 6,
        time: 300,
        difficulty: "Easy",
      },
    ];
    localStorage.setItem("savedScores", JSON.stringify(defaultScores));
    return JSON.parse(localStorage.getItem(SAVEDSCORES));
  };
  //retrieve saved records from localstorage
  const getSavedScores = () => {
    const savedScores = JSON.parse(localStorage.getItem(SAVEDSCORES));
    if (savedScores) {
      return savedScores;
    } else {
      return initSavedScores();
    }
  };

  //save a new game result to the saved scores
  const saveNewScore = (newScore) => {
    let savedScores = JSON.parse(localStorage.getItem(SAVEDSCORES));
    if (savedScores) {
      newScore = { ...newScore, time: time };
      savedScores = [newScore, ...savedScores].slice(0, 10);
      localStorage.setItem(SAVEDSCORES, JSON.stringify(savedScores));
    }
    setSavedScores(savedScores);
  };
  const [savedScores, setSavedScores] = useState(getSavedScores());
  return (
    <ScoreContext.Provider
      value={{
        points,
        updatePoints,
        userAnswers,
        updateUserAnswers,
        saveNewScore,
        savedScores,
        pauseGame,
        time,
        setTime,
        playable,
        startNewGame,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export default ScoreContext;
