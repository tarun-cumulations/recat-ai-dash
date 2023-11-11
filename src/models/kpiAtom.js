import { atom } from "recoil";

export const defaultState = [];

const kpiAtom = atom({
  key: "kpi",
  default: defaultState,
});

export default kpiAtom;
