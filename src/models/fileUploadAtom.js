import { atom } from "recoil";

export const defaultState = false;

const fileUploadAtom = atom({
  key: "fileUpload",
  default: defaultState,
});

export default fileUploadAtom;
