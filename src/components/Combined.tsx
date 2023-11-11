//@ts-nocheck
import React, { useState, useRef } from 'react';
//import './App.css';
import { Button, Stack } from "@mui/material";
import csvImage from "../shared/images/csvImage.svg";
import frameImage from "../shared/images/Frame.svg";
import addMoreImage from "../shared/images/addMore.svg";
import { useRecoilState, useSetRecoilState } from "recoil";
import loadingAtom from "../models/loadingAtom";
import { getKPIData } from "../services/queries";
import kpiAtom from "../models/kpiAtom";
import formDataAtom from "../models/formDataAtom";
import graphTypeAtom from "../models/graphTypeAtom";
import graphDataAtom from "../models/graphDataAtom";
import { LoadingButton } from "@mui/lab";
import errorAtom from "../models/errorAtom";
import { Close } from "@mui/icons-material";
import { isEmpty, isEqual } from "lodash";
import questionAtom from "../models/questionAtom";
import textResponseAtom from "../models/textResponseAtom";
import queryAtom from "../models/queryAtom";
import fileUploadAtom from "../models/fileUploadAtom";
// import { OutputData } from "../services/helper";

// ... other imports ...

const DbAndCsvUploader = () => {
  // ... existing state variables ...
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
  const setIsFileUploaded = useSetRecoilState<boolean>(fileUploadAtom);
  const setQuery = useSetRecoilState<string>(queryAtom);


  const inputRef = useRef<HTMLInputElement>(null);

  const [host, setHost] = useState('127.0.0.1');
  const [port, setPort] = useState('3306');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleDragOver = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles } = event.target;
    if (concat && files && newFiles) {
      const updatedFiles = [...Array.from(files), ...Array.from(newFiles)];
      const fileList = new DataTransfer();
      updatedFiles.forEach(file => fileList.items.add(file));
      setFiles(fileList.files);
    } else {
      setFiles(newFiles);
    }
  };

  const removeFile = (fileToRemove: File) => {
    if (!files) return;

    const updatedFiles = Array.from(files).filter(file => file !== fileToRemove);
    const fileList = new DataTransfer();
    updatedFiles.forEach(file => fileList.items.add(file));
    setFiles(fileList.files);
  };

  const handleDbConnect = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Send a POST request to your server's API to establish the database connection
    try {
      const response = await fetch('YOUR_BACKEND_ENDPOINT/api/connect-db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ host, port, username, password }),
      });

      if (response.ok) {
        console.log('Connected to the database successfully.');
      } else {
        console.error('Failed to connect to the database.');
      }
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Stack
          component="form"
          spacing={2}
          onSubmit={handleDbConnect}
          noValidate
          autoComplete="off"
        >
          <div
            style={{
              height: "55px",
              border: "dashed 1px #BDBDBD",
              borderRadius: "6px",
              background: "#F2F2F2",
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {/* ... Drag and Drop or Browse Files UI ... */}
          </div>

          {/* File list UI */}
          {/* ... */}

          <TextField
            id="host"
            label="Host"
            variant="outlined"
            value={host}
            onChange={e => setHost(e.target.value)}
            fullWidth
          />
          <TextField
            id="port"
            label="Port"
            variant="outlined"
            value={port}
            onChange={e => setPort(e.target.value)}
            fullWidth
          />
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
          />

          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            color="primary"
          >
            Connect DB
          </LoadingButton>
        </Stack>
      </header>
    </div>
  );
};

export default DbAndCsvUploader;
