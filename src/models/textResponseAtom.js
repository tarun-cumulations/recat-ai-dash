import { atom } from "recoil";

export const defaultState = "";

const textResponseAtom = atom({
  key: "textResponse",
  default: defaultState,
});

export default textResponseAtom;
