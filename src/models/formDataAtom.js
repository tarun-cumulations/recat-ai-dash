import { atom } from "recoil";

export const defaultState = {};

const formDataAtom = atom({
  key: "formData",
  default: defaultState,
});

export default formDataAtom;
