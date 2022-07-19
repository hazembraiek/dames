export const getPosAv = ({ pos, player }, Board) => {
  const { x, y } = pos;
  const { sp } = Board[x][y];
  let rp = player == "w" ? -1 : 1;
  let poss;
  if (!sp) {
    poss = [
      { x: x + rp, y: y + 1 },
      { x: x + rp, y: y - 1 },
    ];
  } else
    poss = [
      { x: x + 1, y: y + 1 },
      { x: x + 1, y: y - 1 },
      { x: x - 1, y: y + 1 },
      { x: x - 1, y: y - 1 },
    ];
  let posAv = [];
  poss.forEach((sq) => {
    const X = sq.x,
      Y = sq.y;
    if (!(X < 0 || Y > 7 || X > 7 || Y < 0)) {
      posAv.push({ ...Board[X][Y], pos: { x: X, y: Y } });
    }
  });
  posAv = posAv.map((sq) => {
    let X = sq.pos.x,
      Y = sq.pos.y;
    if (sq.player && sq.player != player) {
      if (sp && X > x) rp = 1;
      else if (sp && X < x) rp = -1;
      X = sq.pos.x + rp;
      if (sq.pos.y > y) {
        Y = sq.pos.y + 1;
      } else Y = sq.pos.y - 1;
    }
    if (!(X < 0 || Y > 7 || X > 7 || Y < 0)) {
      return {
        ...Board[X][Y],
        pos: { x: X, y: Y },
        buf: true,
        removed: { x: sq.pos.x, y: sq.pos.y },
      };
    }
  });
  posAv = posAv.filter(
    (sq) => sq?.cell !== undefined && !sq.active && sq.player != player
  );
  const removedPc = posAv
    .map((sq) => {
      const eq = JSON.stringify(sq.removed) === JSON.stringify(sq.pos);
      if (sq.buf && !eq) {
        return { remP: sq.removed, iPos: sq.pos };
      }
    })
    .filter((sq) => sq !== undefined);

  return { posAv, removedPc };
};
