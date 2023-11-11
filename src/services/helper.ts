interface GraphDataItem {
  datapoints: number[];
  label: string;
}

export interface InputData {
  graphData: GraphDataItem[];
  typeOfGraph: string;
  xaxis: {
    labelName: string;
    xAxisTickLabels: string[];
  };
  yaxis: {
    labelName: string;
    yAxisTickLabels: number[];
  };
}

interface OutputOptions {
  chart: {
    id: string;
  };
  xaxis: {
    title: {
      text: string;
    };
    categories: string[];
  };
  yaxis: {
    title: {
      text: string;
    };
    categories: number[];
  };
}

export interface OutputData {
  options: OutputOptions;
  series: {
    data: number[];
  }[];
}

export function convertData(input: InputData): OutputData {
  const seriesData = input.graphData.map((item) => ({
    data: item.datapoints,
  }));

  const output: OutputData = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        title: {
          text: input.xaxis.labelName,
        },
        categories: input.xaxis.xAxisTickLabels,
      },
      yaxis: {
        title: {
          text: input.yaxis.labelName,
        },
        categories: input.yaxis.yAxisTickLabels,
      },
    },
    series: seriesData,
  };

  return output;
}
