import { useContext, useEffect } from "react";
import ScoreContext from "../context/ScoreContext";

const Score = () => {
  const { points, savedScores, time, setTime, userAnswers, playable } =
    useContext(ScoreContext);

  useEffect(() => {
    let interval;

    if (playable) {
      interval = setInterval(() => setTime(time + 1), 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [time, setTime]);

  return (
    <div className="container score">
      <h3>Elapsed time: {time} s</h3>
      <h3>
        Current Score: {points}/{Object.keys(userAnswers).length} points
      </h3>
      <h3>Last games:</h3>
      <table className="score-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Cat</th>
            <th>Level</th>

            <th>Points</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {savedScores.map((game, index) => (
            <tr
              className={!playable && index === 0 ? "new-score" : ""}
              key={
                game.category +
                game.difficulty +
                game.number +
                game.points +
                game.time
              }
            >
              <td>{index + 1}</td>
              <td>{game.category}</td>
              <td>{game.difficulty}</td>

              <td>
                {game.points}/{game.number}
              </td>
              <td>{game.time}s</td>
              {!playable && index === 0 ? <td>new!</td> : ""}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Score;
