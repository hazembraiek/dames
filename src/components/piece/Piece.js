import "./piece.css";

const Piece = ({ color, sp, eq, isReq }) => {
  return (
    <div
      className={`pc ${eq ? "border" : ""} `}
      style={{ backgroundColor: color == "w" ? "rgb(143 114 60)" : "black" }}
    >
      {sp && <span style={{ color: color == "w" ? "black" : "white" }}>S</span>}
      {isReq && (
        <span style={{ color: color == "w" ? "black" : "white" }}>R</span>
      )}
      <div className="ci one"></div>
      <div className="ci two"></div>
      <div className="ci three"></div>
    </div>
  );
};

export default Piece;
