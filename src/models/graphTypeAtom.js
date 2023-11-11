import { atom } from "recoil";

export const defaultState = "line";

const graphTypeAtom = atom({
  key: "graphType",
  default: defaultState,
});

export default graphTypeAtom;
