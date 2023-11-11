import { atom } from "recoil";

export const defaultState = [];

const questionAtom = atom({
  key: "question",
  default: defaultState,
});

export default questionAtom;
