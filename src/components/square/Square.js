import { useDispatch, useSelector } from "react-redux";
import { BoardAction } from "../../store/slices/board";
import Available from "../available/Available";
import Piece from "../piece/Piece";
import "./square.css";

const Square = ({ pos, active, player, av, removed, sp, currentPos }) => {
  const { canUsePc } = useSelector((state) => state.Board);
  const { x, y } = pos;
  const dispatch = useDispatch();
  const setPiece = () => {
    dispatch(BoardAction.setPiece({ pos, player, removed }));
    dispatch(BoardAction.setPos({ x, y, active }));
  };
  const eq = JSON.stringify(currentPos) === JSON.stringify(pos);
  const isReq = canUsePc.find((sq) => sq.curPc.x == x && sq.curPc.y == y)
    ? true
    : false;
  return (
    <div
      className="sqr"
      style={{ backgroundColor: active ? "#2d1804" : "#cea453" }}
      onClick={setPiece}
    >
      {player && removed && (
        <Piece color={player} sp={sp} eq={eq} isReq={isReq} />
      )}
      {av && <Available />}
    </div>
  );
};
export default Square;
