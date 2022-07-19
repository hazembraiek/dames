import { createSlice } from "@reduxjs/toolkit";
import { clearBoard } from "../../helpers/clearBoard";
import { createBord } from "../../helpers/createBord";
import { getPosAv } from "../../helpers/getPosAv";
import { initialPos } from "../../helpers/initialPos";

const initialState = {
  Board: createBord(),
  piecesPos: [...initialPos()],
  currentPiece: null,
  turn: "w",
  removed: null,
  gameOver: false,
  gameStart: false,
  canUsePc: [],
};

const Board = createSlice({
  name: "Board",
  initialState,
  reducers: {
    setMoveToBoard(state, action) {
      const poss = action.payload;
      poss.forEach((move) => {
        state.Board[move.pos.x][move.pos.y] = Object.assign(
          state.Board[move.pos.x][move.pos.y],
          move
        );
      });
    },
    setPiece(state, action) {
      const pieceData = action.payload;
      if (state.turn != pieceData.player || !pieceData.removed) return;
      state.currentPiece = pieceData;
      state.Board = clearBoard(state.Board);
      const { posAv: availablePos, removedPc } = getPosAv(
        pieceData,
        state.Board
      );
      availablePos.forEach((sq) => {
        state.Board[sq.pos.x][sq.pos.y].available = true;
      });
      state.removed = [...removedPc];
    },
    setPos(state, action) {
      const { x, y, active } = action.payload;
      if (state.Board[x][y].player || !active || !state.currentPiece) return;
      const { pos, player } = state.currentPiece;
      const rem = state.removed.find(
        (sq) => sq?.iPos.x == x && sq?.iPos.y == y
      );
      const pcRem = state.canUsePc.find(
        (sq) =>
          sq?.iPos.x == x &&
          sq?.iPos.y == y &&
          sq.curPc.x == pos.x &&
          sq.curPc.y == pos.y
      );
      if (state.canUsePc.length !== 0 && !pcRem) {
        const { x, y } = state.canUsePc[0].curPc;
        state.Board[x][y].active = false;
        state.Board[x][y].player = null;
      }
      const aux = state.Board[x][y];
      if (!aux.available) return;
      state.Board[x][y] = state.Board[pos.x][pos.y];
      state.Board[x][y].pos = { x, y };
      state.Board[pos.x][pos.y] = aux;
      const newPieceData = { pos: { x, y }, player };
      const { removedPc } = getPosAv(newPieceData, state.Board);
      if (!rem || removedPc.length == 0)
        state.turn = state.turn == "w" ? "b" : "w";
      state.currentPiece = null;
      state.Board = clearBoard(state.Board);

      // if (state.removed.length != 0 && !rem) {
      //   state.Board[x][y].active = false;
      //   state.Board[x][y].player = null;
      // }
      if (rem) {
        state.Board[rem.remP.x][rem.remP.y].active = false;
        state.Board[rem.remP.x][rem.remP.y].player = null;
        console.log("buff💣💣💣");
      }
      if (
        (x == 0 && state.Board[x][y].player == "w") ||
        (x == 7 && state.Board[x][y].player == "b")
      )
        state.Board[x][y].sp = true;
    },
    searchPc(state, action) {
      const turn = action.payload;
      const Board = state.Board;
      state.canUsePc = [];
      Board.forEach((row) => {
        row.forEach((sq) => {
          if (sq.player == turn) {
            const { removedPc: pieces } = getPosAv(
              { pos: sq.pos, player: turn },
              Board
            );
            pieces.forEach((rem) => (rem.curPc = sq.pos));
            state.canUsePc.push(...pieces);
          }
        });
      });
    },
    gameOver(state, action) {
      const res = action.payload;
      state.gameOver = res;
    },
    gameStart(state) {
      state.gameStart = true;
    },
  },
});

export const BoardAction = Board.actions;
export default Board;
