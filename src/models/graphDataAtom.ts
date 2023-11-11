import { atom } from "recoil";
import { OutputData } from "../services/helper";

export const defaultState: OutputData = {
  options: {
    chart: {
      id: "d",
    },
    xaxis: {
      title: {
        text: "",
      },
      categories: [],
    },
    yaxis: {
      title: {
        text: "",
      },
      categories: [],
    },
  },
  series: [
    {
      data: [],
    },
  ],
};
const graphDataAtom = atom({
  key: "graphData",
  default: defaultState,
});

export default graphDataAtom;
