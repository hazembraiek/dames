import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBord } from "../../helpers/createBord";
import { BoardAction } from "../../store/slices/board";
import Square from "../square/Square";
import "./Game.css";

const getTime = (time) => {
  const min = ("0" + Math.floor(time / 60)).slice(-2);
  const sec = ("0" + (time - min * 60)).slice(-2);
  return { min, sec };
};

const Game = () => {
  const { Board, piecesPos, turn, currentPiece, gameOver, canUsePc } =
    useSelector((state) => state.Board);

  const [time1, setTime1] = useState(0);
  const [time2, setTime2] = useState(0);

  useEffect(() => {
    if (!gameOver)
      setTimeout(() => {
        if (turn == "w") setTime1(time1 + 1);
        else setTime2(time2 + 1);
      }, 1000);
  }, [time1, time2]);

  const { min, sec } = getTime(time1);
  const { min: min1, sec: sec1 } = getTime(time2);

  const count = (c) => {
    let res = 0;
    for (let i = 0; i < Board.length; i++)
      for (let j = 0; j < Board[i].length; j++)
        if (Board[i][j].player == c) res++;
    return res;
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(BoardAction.setMoveToBoard(piecesPos));
  }, [piecesPos]);
  let blP = count("b");
  let WhP = count("w");
  blP = count("b");
  WhP = count("w");
  useEffect(() => {
    if (time1 > 10 || time2 > 10)
      if (blP == 0 || time1 >= 600) {
        dispatch(BoardAction.gameOver("b"));
      } else if (WhP == 0 || time2 >= 600) {
        dispatch(BoardAction.gameOver("w"));
      }
  }, [blP, WhP, time1, time2]);
  return (
    <div className="game">
      <div className="user">
        <p className={turn == "w" ? "wh" : ""}>
          White: {WhP}
          <span>
            {min}:{sec}
          </span>
        </p>
        <p className={turn == "b" ? "bl" : ""}>
          <span>
            {min1}:{sec1}
          </span>
          Black: {blP}
        </p>
      </div>
      <div className="board">
        {Board.map((row, x) =>
          row.map((cell, y) => (
            <Square
              pos={{ x, y }}
              key={y}
              active={cell.cell == 1 ? false : true}
              player={cell.player}
              av={cell.available}
              removed={cell.active}
              sp={cell.sp}
              currentPos={currentPiece?.pos}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Game;
