import "./GameOver.css";
const GameOver = ({ win }) => {
  const resetGame = () => {
    window.location.reload();
  };
  return (
    <div className="popup">
      <div className="content">
        <p>
          the Winner is the player with the{" "}
          <span style={{ color: win == "w" ? "white" : "black" }}>
            {win == "w" ? " White " : " Black "}
          </span>
          color
        </p>
      </div>
      <p className="btn" onClick={resetGame}>
        Reset Game
      </p>
    </div>
  );
};

export default GameOver;
