import { atom } from "recoil";

export const defaultState = "";

const errorAtom = atom({
  key: "error",
  default: defaultState,
});

export default errorAtom;
