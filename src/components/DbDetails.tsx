//@ts-nocheck
import React, { useState, useRef } from "react";
//import './App.css';
import {
  Button,
  Stack,
  TextField,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
} from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import CsvDragDropFiles from "../components/CsvDragFiles";
import loadingAtom from "../models/loadingAtom";
import errorAtom from "../models/errorAtom";
import dbConfigAtom from "../models/dbConfigAtom";
import { getGraphDataDb } from "../services/queries";
import questionAtom from "../models/questionAtom";
import textResponseAtom from "../models/textResponseAtom";
import queryAtom from "../models/queryAtom";
import kpiAtom from "../models/kpiAtom";
import formDataAtom from "../models/formDataAtom";
import graphTypeAtom from "../models/graphTypeAtom";
import graphDataAtom from "../models/graphDataAtom";
import fileUploadAtom from "../models/fileUploadAtom";
import { getKPIDataSql } from "../services/queries";

const DbDetailsForm = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const setFormData = useSetRecoilState(formDataAtom);
  const setKpis = useSetRecoilState<string[]>(kpiAtom);
  const setQuestions = useSetRecoilState<string[]>(questionAtom);
  const [isLoading, setIsLoading] = useRecoilState<boolean>(loadingAtom);
  const setGraphData = useSetRecoilState<OutputData>(graphDataAtom);
  const setTextResponse = useSetRecoilState<string>(textResponseAtom);
  const setGraphType = useSetRecoilState<string>(graphTypeAtom);
  const [concat, setConcat] = useState<boolean>(false);
  const setError = useSetRecoilState<string>(errorAtom);
  //const setIsFileUploaded = useSetRecoilState<boolean>(fileUploadAtom);
  const setQuery = useSetRecoilState<string>(queryAtom);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  // Local state for form fields
  const [host, setHost] = useState("");
  const [database, setDatabase] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("db");
  const setDbConfig = useSetRecoilState(dbConfigAtom);

  const styles = {
    connectDB: {
      // Assuming you want a default style for the non-selected state
      "&.MuiToggleButton-root": {
        color: "#96969A", // Non-selected state color
        fontSize: "14px",
        fontFamily: "Inter",
        textTransform: "none",
        fontWeight: "500",
        lineHeight: "18px",
      },
      "&.Mui-selected": {
        color: "white",
        backgroundColor: "#4FD1C5",
        fontSize: "14px",
        fontFamily: "Inter",
        fontWeight: "600",
        lineHeight: "18px",
      },
      "&.MuiToggleButton-root:hover": {
        backgroundColor: "#35a0a7",
      },
    },
    uploadCSVButton: {
      "&.MuiToggleButton-root": {
        color: "#4FD1C5",
        textTransform: "none",
        fontSize: "14px",
        fontFamily: "Inter",
        fontWeight: "500",
        lineHeight: "18px",
      },
      "&.Mui-selected": {
        color: "white",
        backgroundColor: "#4FD1C5",
        fontSize: "14px",
        fontFamily: "Inter",
        fontWeight: "600",
        lineHeight: "18px",
      },
      "&.MuiToggleButton-root:hover": {
        backgroundColor: "#35a0a7",
      },
    },
    uploadFileLabel: {
      color: "#3C4858",
      fontSize: "14px",
      fontFamily: "Inter",
      fontWeight: "600",
      lineHeight: "20px",
      wordWrap: "break-word",
    },
    uploadCSVLabel: {
      color: "white",
      fontSize: "12px",
      fontFamily: "Inter",
      fontWeight: "600",
      lineHeight: "16px",
      wordWrap: "break-word",
    },
    textFieldStyles: {
      width: "352px",
      height: "42px",
      backgroundColor: "white",
      borderRadius: "6px",
      border: "1px solid #C0CCDA",
      justifyContent: "center",
      alignItems: "center",
      display: "inline-flex",
      "& .MuiOutlinedInput-root": {
        height: "100%",
        borderRadius: "6px",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #C0CCDA",
      },
      "& .MuiInputBase-input": {
        height: "100%",
        boxSizing: "border-box",
      },
    },
    uploadCSVButton2: {
      // Styling for the "Upload CSV" button
      backgroundColor: "#4FD1C5",
      color: "white",
      textTransform: "none",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "20px",
      boxShadow: "none",
      "&:hover": {
        backgroundColor: "#35a0a7",
      },
      borderRadius: "4px",
      width: "200px",
      padding: "10px 20px",
    },
  };

  const handleDbConnect = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setKpis([]);
    setIsFileUploaded(false);
    setQuestions([]);
    setIsLoading(true);

    const newFormData = new FormData();

    // Append the form data fields
    newFormData.append("db_host", host);
    newFormData.append("db_name", database);
    newFormData.append("db_user", username);
    newFormData.append("db_pass", password);

    localStorage.setItem("db_host", host);
    localStorage.setItem("db_name", database);
    localStorage.setItem("db_user", username);
    localStorage.setItem("db_pass", password);
    localStorage.setItem("currentContext", "db");

    setDbConfig({
      host: host,
      database: database,
      user: username,
      password: password,
    });

    // Set the new FormData in the state
    setFormData(newFormData);

    getKPIDataSql(
      newFormData,
      setIsLoading,
      setQuestions,
      setKpis,
      setError,
      setGraphType,
      setGraphData,
      setTextResponse,
      setQuery,
      setIsFileUploaded
    );
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        background: "#F2F4F6",
      }}
    >
      <Stack
        spacing={2}
        // justifyContent="center"
        alignItems="center"
        sx={{
          width: 800,
          background: "white",
          padding: "25px",
          borderRadius: 2,
          boxShadow: "0px 8px 24px rgba(17, 17, 17, 0.24)",
          height: 360,
        }}
      >
        <ToggleButtonGroup
          fullWidth
          color="primary"
          value={selectedOption}
          exclusive
          onChange={(event, newOption) => setSelectedOption(newOption)}
          sx={{ width: "100%" }}
        >
          <ToggleButton value="db" sx={styles.connectDB}>
            Connect DB
          </ToggleButton>
          <ToggleButton value="csv" sx={styles.uploadCSVButton}>
            Upload CSV
          </ToggleButton>
        </ToggleButtonGroup>

        {selectedOption === "db" && (
          <form
            onSubmit={handleDbConnect}
            style={{ width: "100%", height: "100%" }}
          >
            <Stack width="100%" height="100%" justifyContent={"space-between"}>
              <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
                <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
                  <Stack direction={"row"} gap={2}>
                    <Stack width="100%">
                      <Typography
                        variant={"body2"}
                        fontWeight={600}
                        color={"#3c4858"}
                      >
                        Host
                      </Typography>
                      <TextField
                        variant="outlined"
                        value={host}
                        onChange={(e) => setHost(e.target.value)}
                        fullWidth
                        size={"small"}
                      />
                    </Stack>
                    <Stack width="100%">
                      <Typography
                        variant={"body2"}
                        fontWeight={600}
                        color={"#3c4858"}
                      >
                        Database
                      </Typography>
                      <TextField
                        variant="outlined"
                        value={database}
                        onChange={(e) => setDatabase(e.target.value)}
                        fullWidth
                        size={"small"}
                      />
                    </Stack>
                  </Stack>
                  <Stack width="100%">
                    <Typography
                      variant={"body2"}
                      fontWeight={600}
                      color={"#3c4858"}
                    >
                      Username
                    </Typography>
                    <TextField
                      variant="outlined"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      fullWidth
                      size={"small"}
                    />
                  </Stack>
                  <Stack width="100%">
                    <Typography
                      variant={"body2"}
                      fontWeight={600}
                      color={"#3c4858"}
                    >
                      Password
                    </Typography>
                    <TextField
                      type="password"
                      variant="outlined"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                      size={"small"}
                    />
                  </Stack>
                </Stack>
              </Stack>
              <Stack alignItems={"end"}>
                <LoadingButton
                  disabled={
                    isLoading ||
                    host === "" ||
                    database === "" ||
                    username === "" ||
                    password === ""
                  }
                  loading={isLoading}
                  type="submit"
                  variant="contained"
                  sx={{
                    background: "#4FD1C5",
                    width: "80px",
                    fontSize: "12px",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Submit
                </LoadingButton>
              </Stack>
            </Stack>
          </form>
        )}

        {selectedOption === "csv" && <CsvDragDropFiles />}
      </Stack>
    </div>
  );
};

export default DbDetailsForm;
