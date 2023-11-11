import { atom } from "recoil";

export const defaultState = "";

const queryAtom = atom({
  key: "query",
  default: defaultState,
});

export default queryAtom;
