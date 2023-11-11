import { atom } from "recoil";

export const defaultState = false;

const loadingAtom = atom({
  key: "loading",
  default: defaultState,
});

export default loadingAtom;
