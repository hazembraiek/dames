import { Pos } from "../constants/initialPos";

export const initialPos = () => {
  const positions = Array(24)
    .fill()
    .map((_, i) => {
      return {
        player: i < 12 ? "b" : "w",
        pos: Pos[i],
        sp: false,
        active: true,
      };
    });
  return positions;
};
