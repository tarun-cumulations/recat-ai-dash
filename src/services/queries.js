import axios from "axios";
import { convertData } from "./helper";
import { cloneDeep } from "lodash";

export const getKPIData = (
  formData,
  setIsLoading,
  setQuestions,
  setKpis,
  setError,
  setGraphType,
  setGraphData,
  setTextResponse,
  setQuery,
  setIsFileUploaded
) => {
  axios
    .post("http://15.206.91.113:5000/generate-kpi-and-questions", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      setKpis(res.data.KPIs);
      setQuestions(res.data.Questions);
      setIsFileUploaded(true);
      if (res.data.KPIs && res.data.KPIs[0]) {
        getGraphData(
          formData,
          "graph",
          setIsLoading,
          res.data.KPIs[0],
          setGraphType,
          setGraphData,
          setTextResponse,
          setError,
          setQuery
        );
        setError("");
      } else {
        setError("No kpis found, try some custom KPI");
      }
    })
    .catch((err) => {
      // setIsFileUploaded(true);
      // Handle error
      console.log(err);
      setError("No data found for the KPI. Try some other KPI");
      setIsLoading(false);
    });
};

export const getGraphData = (
  formData,
  dataType,
  setIsLoading,
  kpi,
  setGraphType,
  setGraphData,
  setTextResponse,
  setError,
  setQuery
) => {
  formData.append("query", kpi);
  formData.append("mode", dataType);
  setQuery(kpi);
  axios
    .post("http://15.206.91.113:5000/get-analytics", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      formData.delete("query");
      formData.delete("mode");
      console.log(res);
      if (typeof res.data === "string") {
        setError("No data found for the KPI. Try some other KPI");
      } else {
        setError("");
        if (dataType === "graph") {
          const graphData = convertData(res.data);

          setGraphData((data) => {
            const clonnedGraphData = cloneDeep(data);
            clonnedGraphData.options = { ...graphData.options };
            clonnedGraphData.series = [...graphData.series];
            return clonnedGraphData;
          });
        } else {
          setTextResponse(res.data.TextualResponse);
        }
      }
      setGraphType(res.data.typeOfGraph);
      setIsLoading(false);
    })
    .catch((err) => {
      formData.delete("query");
      formData.delete("mode");
      // Handle error
      console.log(err);
      setError("No data found for the KPI. Try some other KPI");
      setIsLoading(false);
    });
};
