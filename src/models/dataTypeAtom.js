import { atom } from "recoil";

export const defaultState = "graph";

const dataTypeAtom = atom({
  key: "dataType",
  default: defaultState,
});

export default dataTypeAtom;
