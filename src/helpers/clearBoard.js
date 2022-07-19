export const clearBoard = (Board) => {
  return Board.map((row) =>
    row.map((cell) => {
      return { ...cell, available: false };
    })
  );
};
