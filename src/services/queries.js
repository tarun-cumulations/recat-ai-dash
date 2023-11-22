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
  setQuery
) => {
  axios
    // .post("http://localhost:5000/generate-kpi-and-questions", formData, {
    .post("http://15.206.91.113:3000/generate-kpi-and-questions", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      setKpis(res.data.KPIs);
      setQuestions(res.data.Questions);
      //setIsFileUploaded(true);
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
    // .post("http://localhost:5000/get-analytics-csv", formData, {
    .post("http://15.206.91.113:3000/get-analytics-csv", formData, {
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

export const getGraphDataDb = (
  dbConfig,
  dataType, // Add dataType as a parameter
  setIsLoading, // Move setIsLoading to the correct position
  kpi,
  setGraphType,
  setGraphData,
  setTextResponse,
  setError,
  setQuery
) => {
  setIsLoading(true);
  console.log("kpi:", kpi);
  setQuery(kpi);

  // Create a FormData object and append the data
  let formData = new FormData();
  formData.append("query", kpi);
  formData.append("mode", dataType); // Use the dataType parameter
  formData.append("db_host", localStorage.getItem("db_host"));
  formData.append("db_name", localStorage.getItem("db_name"));
  formData.append("db_user", localStorage.getItem("db_user"));
  formData.append("db_pass", localStorage.getItem("db_pass"));
  console.log(formData);
  console.log("password is ", dbConfig.password);

  axios
    .post("http://15.206.91.113:3000/get-analytics-sql", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      formData.delete("query");
      formData.delete("mode");
      formData.delete("db_host");
      formData.delete("db_name");
      formData.delete("db_user");
      formData.delete("db_pass");
      if (typeof res.data === "string") {
        // setError("No data found for the KPI. Try some other KPI");
      } else {
        setError("");
        if (dataType === "graph") {
          // Assuming graphData is defined somewhere
          setGraphData((data) => {
            const clonnedGraphData = cloneDeep(data);
            clonnedGraphData.options = { ...res.data.options };
            clonnedGraphData.series = [...res.data.series];
            return clonnedGraphData;
          });
        } else {
          setTextResponse(res.data.TextualResponse);
        }
        setGraphType(res.data.typeOfGraph);
      }
    })
    .catch((err) => {
      console.error(err);
      // setError("Failed to retrieve data. " + err.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

// export const getGraphDataDb = (
//   dbConfig,
//   dataType,
//   setIsLoading,
//   setGraphType,
//   setGraphData,
//   setTextResponse,
//   setError,
//   setQuery
// ) => {
//   setIsLoading(true);
//   console.log("kpi:", kpi);
//   setQuery(kpi);

//   // Create a FormData object and append the data
//   let formData = new FormData();
//   formData.append("query", kpi);
//   formData.append("mode", dataType); // Use the dataType parameter
//   formData.append("db_host", dbConfig.host);
//   formData.append("db_name", dbConfig.database);
//   formData.append("db_user", dbConfig.user);
//   formData.append("db_pass", dbConfig.password);

//   axios
//     .post("http://localhost:5000/get-analytics-sql", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     .then((res) => {
//       formData.delete("query");
//       formData.delete("mode");
//       formData.delete("db_host");
//       formData.delete("db_name");
//       formData.delete("db_user");
//       formData.delete("db_pass");
//       if (typeof res.data === "string") {
//         // setError("No data found for the KPI. Try some other KPI");
//       } else {
//         setError("");
//         if (dataType === "graph") {
//           // Assuming graphData is defined somewhere
//           setGraphData((data) => {
//             const clonnedGraphData = cloneDeep(data);
//             clonnedGraphData.options = { ...res.data.options };
//             clonnedGraphData.series = [...res.data.series];
//             return clonnedGraphData;
//           });
//         } else {
//           setTextResponse(res.data.TextualResponse);
//         }
//         setGraphType(res.data.typeOfGraph);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       // setError("Failed to retrieve data. " + err.message);
//     })
//     .finally(() => {
//       setIsLoading(false);
//     });
// };

export const getKPIDataSql = async (
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
  try {
    const response = await axios.post(
      "http://15.206.91.113:3000/generate-kpi-and-questions-sql",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Handle successful response
    const { KPIs, Questions } = response.data;

    // Cleanup formData
    ["db_host", "db_name", "db_user", "db_pass"].forEach((key) =>
      formData.delete(key)
    );

    // Update state
    setKpis(KPIs);
    setQuestions(Questions);
    setIsFileUploaded(true);

    if (KPIs && KPIs[0]) {
      getGraphDataDb(
        formData,
        "graph",
        setIsLoading,
        KPIs[0],
        setGraphType,
        setGraphData,
        setTextResponse,
        setError,
        setQuery
      );
      setError("");
    } else {
      setError("No KPIs found, try some custom KPI");
    }
  } catch (error) {
    // Handle errors
    setIsFileUploaded(true);
    console.error(error);
    setError(`Error: ${error.message}`);
    setIsLoading(false);
  }
};
