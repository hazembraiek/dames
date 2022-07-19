import "./App.css";
import Game from "./components/Game/Game";
import { BoardAction } from "./store/slices/board";
import { useDispatch, useSelector } from "react-redux";
import GameOver from "./components/GameOver/GameOver";
import { useEffect } from "react";
import play from "./images/play-solid.svg";

function App() {
  const { gameStart, gameOver, currentPiece, turn } = useSelector(
    (state) => state.Board
  );
  const dispatch = useDispatch();
  const startGame = () => {
    dispatch(BoardAction.gameStart());
  };
  useEffect(() => {
    dispatch(BoardAction.searchPc(turn));
  }, [currentPiece]);
  return (
    <div className="App">
      {gameOver ? <GameOver win={gameOver} /> : ""}
      <h1>Dames Game Created With Hazem Braiek</h1>
      {gameStart ? (
        <Game />
      ) : (
        <p onClick={startGame} className="start">
          <span>
            <img src={play} alt="" />
          </span>
        </p>
      )}
    </div>
  );
}

export default App;
