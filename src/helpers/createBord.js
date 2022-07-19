export const createBord = () => {
  let board = Array.from(
    Array(8)
      .fill()
      .map((_, i) =>
        Array(8)
          .fill()
          .map((_, idx) => {
            return {
              cell: i % 2 == 0 ? idx % 2 : (idx % 2) + 1,
            };
          })
      )
  );
  return board;
};
