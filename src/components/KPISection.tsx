import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import nextArrow from "../shared/images/nextArrow.svg";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import kpiAtom from "../models/kpiAtom";
import { getGraphData,getGraphDataDb } from "../services/queries";
import textSelectedImage from "../shared/images/textSelected.svg";
import graphSelectedImage from "../shared/images/graphSelected.svg";
import textImage from "../shared/images/textIcon.svg";
import graphImage from "../shared/images/graphIcon.svg";
import formDataAtom from "../models/formDataAtom";
import loadingAtom from "../models/loadingAtom";
import { OutputData } from "../services/helper";
import graphDataAtom from "../models/graphDataAtom";
import graphTypeAtom from "../models/graphTypeAtom";
import errorAtom from "../models/errorAtom";
import dataTypeAtom from "../models/dataTypeAtom";
import questionAtom from "../models/questionAtom";
import queryAtom from "../models/queryAtom";
import textResponseAtom from "../models/textResponseAtom";
import { styled } from "@mui/material/styles";
import { EmptyState } from "./EmptyState";

const MuiToggleButton = styled(ToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#4FD1C5",
  },
});

export const KPISection = () => {
  const [selectedKPI, setSelectedKPI] = useState<number>(0);
  const [customKPI, setCustomKPI] = useState<string>("");
  const formData = useRecoilValue(formDataAtom);
  const [kpis, setKpis] = useRecoilState<string[]>(kpiAtom);
  const [questions, setQuestions] = useRecoilState<string[]>(questionAtom);
  const setIsLoading = useSetRecoilState<boolean>(loadingAtom);
  const setGraphData = useSetRecoilState<OutputData>(graphDataAtom);
  const setGraphType = useSetRecoilState<string>(graphTypeAtom);
  const setQuery = useSetRecoilState<string>(queryAtom);
  const setTextResponse = useSetRecoilState<string>(textResponseAtom);
  const setError = useSetRecoilState<string>(errorAtom);
  const [dataType, setDataType] = useRecoilState<string>(dataTypeAtom);

  function KPI() {
    if (customKPI !== "") {
      setIsLoading(true);
      if (dataType === "graph") {
        setKpis([...kpis, customKPI]);
        setSelectedKPI(kpis.length);
      } else if (dataType === "text") {
        setQuestions([...questions, customKPI]);
        setSelectedKPI(questions.length);
      }

      getGraphDataDb(
        formData,
        dataType,
        setIsLoading,
        customKPI,
        setGraphType,
        setGraphData,
        setTextResponse,
        setError,
        setQuery
      );
      setCustomKPI("");
    }
  }

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setDataType(newAlignment);
      setSelectedKPI(0);
      if (newAlignment === "graph" && kpis.length > 0) {
        setIsLoading(true);
        getGraphDataDb(
          formData,
          newAlignment,
          setIsLoading,
          kpis[0],
          setGraphType,
          setGraphData,
          setTextResponse,
          setError,
          setQuery
        );
      } else if (newAlignment === "text" && questions.length > 0) {
        setIsLoading(true);
        getGraphDataDb(
          formData,
          newAlignment,
          setIsLoading,
          questions[0],
          setGraphType,
          setGraphData,
          setTextResponse,
          setError,
          setQuery
        );
      }
    }
  };

  return (
    <Stack
      sx={{ padding: "40px", height: "560px" }}
      justifyContent={"space-between"}
    >
      <Stack>
        <ToggleButtonGroup
          sx={{
            marginBottom: "24px",
            background: "#d9f3f1",
            width: "fit-content",
            // color: "#4FD1C5",
          }}
          value={dataType}
          exclusive
          onChange={handleChange}
          size={"small"}
        >
          <MuiToggleButton
            value="graph"
            sx={{
              padding: "4px",
              textTransform: "none",
              width: "80px",
              margin: "4px",
              border: "none",
            }}
          >
            {dataType === "text" ? (
              <img style={{ width: "20px" }} src={graphImage} alt="empty" />
            ) : (
              <img
                style={{ width: "20px" }}
                src={graphSelectedImage}
                alt="empty"
              />
            )}
            <span
              style={{
                marginLeft: "3px",
                color: dataType === "graph" ? "#FFF" : "grey",
              }}
            >
              Graph
            </span>
          </MuiToggleButton>
          <MuiToggleButton
            value="text"
            sx={{
              padding: "4px",
              textTransform: "none",
              width: "80px",
              margin: "4px",
              border: "none",
            }}
          >
            {dataType === "graph" ? (
              <img style={{ width: "20px" }} src={textImage} alt="empty" />
            ) : (
              <img
                style={{ width: "20px" }}
                src={textSelectedImage}
                alt="empty"
              />
            )}
            <span
              style={{
                color: dataType === "text" ? "#FFF" : "grey",
                marginLeft: "3px",
              }}
            >
              Text
            </span>
          </MuiToggleButton>
        </ToggleButtonGroup>

        {dataType === "graph" ? (
          kpis.length > 0 ? (
            <Stack gap={1.5} sx={{ maxHeight: "398px", overflowY: "auto" }}>
              {kpis.map((item, index) => (
                <TextField
                  onClick={() => {
                    setIsLoading(true);
                    getGraphDataDb(
                      formData,
                      dataType,
                      setIsLoading,
                      item,
                      setGraphType,
                      setGraphData,
                      setTextResponse,
                      setError,
                      setQuery
                    );
                    setSelectedKPI(index);
                  }}
                  inputProps={{
                    readOnly: true,
                    style: {
                      height: "12px",
                      color: selectedKPI === index ? "#FFF" : "#111",
                      border: "none",
                      cursor: "pointer",
                    },
                  }}
                  key={index}
                  sx={{
                    borderRadius: "8px",
                    fontSize: "16px",
                    cursor: "pointer",
                    background: selectedKPI === index ? "#4FD1C5" : "#FFF",
                    "& fieldset":
                      selectedKPI === index ? { border: "none" } : {},
                  }}
                  value={item}
                />
              ))}
            </Stack>
          ) : (
            <Stack sx={{ height: "420px" }}>
              <EmptyState isQueryEmpty={true} />
            </Stack>
          )
        ) : questions.length > 0 ? (
          <Stack gap={1.5} sx={{ maxHeight: "444px", overflowY: "auto" }}>
            {questions.map((item, index) => (
              <TextField
                onClick={() => {
                  setIsLoading(true);
                  getGraphDataDb(
                    formData,
                    dataType,
                    setIsLoading,
                    item,
                    setGraphType,
                    setGraphData,
                    setTextResponse,
                    setError,
                    setQuery
                  );
                  setSelectedKPI(index);
                }}
                inputProps={{
                  readOnly: true,
                  style: {
                    height: "12px",
                    color: selectedKPI === index ? "#FFF" : "#111",
                    cursor: "pointer",
                    border: "none",
                  },
                }}
                key={index}
                sx={{
                  borderRadius: "8px",
                  fontSize: "16px",
                  cursor: "pointer",
                  background: selectedKPI === index ? "#4FD1C5" : "#FFF",
                  "& fieldset": selectedKPI === index ? { border: "none" } : {},
                }}
                value={item}
              />
            ))}
          </Stack>
        ) : (
          <Stack sx={{ height: "420px" }}>
            <EmptyState isQueryEmpty={true} />
          </Stack>
        )}
      </Stack>
      <Stack>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="customKPI">Type for custom input</InputLabel>
          <OutlinedInput
            id="customKPI"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                KPI();
              }
            }}
            onChange={(e) => {
              setCustomKPI(e.target.value);
            }}
            value={customKPI}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={KPI} edge="end">
                  <img src={nextArrow} alt="arrow" />
                </IconButton>
              </InputAdornment>
            }
            label="Type for custom input"
          />
        </FormControl>
      </Stack>
    </Stack>
  );
};
