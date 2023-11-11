//@ts-nocheck
import React, { useState, useRef } from 'react';
//import './App.css';
import { Button, Stack, TextField, IconButton, ToggleButtonGroup, ToggleButton ,Typography} from "@mui/material";
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
import CloseIcon from '@mui/icons-material/Close';


const DragDropFiles = () => {
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [files, setFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState('db'); 

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const styles = {
    connectDB: {
      // Assuming you want a default style for the non-selected state
      '&.MuiToggleButton-root': {
        color: '#96969A', // Non-selected state color
        fontSize: '14px',
        fontFamily: 'Inter',
        fontWeight: '500',
        lineHeight: '18px',
      },
      '&.Mui-selected': {
        color: 'white',
        backgroundColor: '#4FD1C5', 
        fontSize: '16px',
        fontFamily: 'Inter',
        fontWeight: '600',
        lineHeight: '18px',
      },
      '&.MuiToggleButton-root:hover': {
        backgroundColor: '#35a0a7', 
      },
    },
    uploadCSVButton: {
      
      '&.MuiToggleButton-root': {
        color: '#4FD1C5', 
        fontSize: '14px',
        fontFamily: 'Inter',
        fontWeight: '500',
        lineHeight: '18px',
      },
      '&.Mui-selected': {
        color: 'white',
        backgroundColor: '#4FD1C5', 
        fontSize: '16px',
        fontFamily: 'Inter',
        fontWeight: '600',
        lineHeight: '18px',
      },
      '&.MuiToggleButton-root:hover': {
        backgroundColor: '#35a0a7', 
      },
    },
    uploadFileLabel: {
      color: '#3C4858',
      fontSize: '14px',
      fontFamily: 'Inter',
      fontWeight: '600',
      lineHeight: '20px',
      wordWrap: 'break-word',
    },
    uploadCSVLabel: {
      color: 'white',
      fontSize: '12px',
      fontFamily: 'Inter',
      fontWeight: '600',
      lineHeight: '16px',
      wordWrap: 'break-word',
    },
    submitButton: {
      backgroundColor: '#4FD1C5', 
    color: 'white', 
    fontSize: '14px', 
    fontFamily: 'Inter', 
    fontWeight: '600', 
    lineHeight: '20px', 
    textTransform: 'none', 
    borderRadius: '4px', 
    boxShadow: 'none', 
    '&:hover': {
      backgroundColor: '#35a0a7', 
    },
    width: 'fit-content', 
    padding: '10px 20px', 
    
    },
    textFieldStyles : {
      width: '352px', 
    height: '42px', 
    backgroundColor: 'white', 
    borderRadius: '6px', 
    border: '1px solid #C0CCDA', 
    justifyContent: 'center', 
    alignItems: 'center', 
    display: 'inline-flex', 
    '& .MuiOutlinedInput-root': { 
      height: '100%', 
      borderRadius: '6px', 
    },
    '& .MuiOutlinedInput-notchedOutline': { 
      border: '1px solid #C0CCDA', 
    },
    '& .MuiInputBase-input': { 
      height: '100%', 
      boxSizing: 'border-box', 
    },
    },
    uploadCSVButton2: {
      // Styling for the "Upload CSV" button
      backgroundColor: '#4FD1C5',
      color: 'white',
      textTransform: 'none',
      fontWeight: '600',
      fontSize: '14px',
      lineHeight: '20px',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#35a0a7',
      },
      borderRadius: '4px',
      width: '200px', 
      padding: '10px 20px',
    },
    submitButtonContainer: {
      display: 'flex',
      justifyContent: 'flex-end', // This pushes the button to the right
      width: '100%', // Container takes full width
    }
  };
 
  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleDbConnect = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Here you should send the connection details to your server
    // For demonstration, we're just logging to the console
    console.log('Attempting to connect to the database with', { host, port, username, password });
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Connected to the database successfully');
    }, 2000);
  };

  const fileElements = files ? Array.from(files).map((file, index) => (
    <Stack key={index} direction="row" alignItems="center" spacing={1}>
      <span>{file.name}</span>
      <IconButton size="small" onClick={() => removeFile(index)}>
        <CloseIcon fontSize="inherit" />
      </IconButton>
    </Stack>
  )) : null;

  const removeFile = (fileIndex) => {
    setFiles((currentFiles) => {
      const newFiles = Array.from(currentFiles);
      newFiles.splice(fileIndex, 1);
      return newFiles.length > 0 ? new FileListItems(newFiles) : null;
    });
  };


  let handleFileInputChange =async()=>{
    console.log("CSV slected")
  }

  let handleFileUpload = async()=>{
    console.log("Handled")
  }

return (
  <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#F2F4F6' }}>
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ width: 800, background: 'white', padding: '20px', borderRadius: 2, boxShadow: '0px 8px 24px rgba(17, 17, 17, 0.24)' }}
    >
      <ToggleButtonGroup
        color="primary"
        value={selectedOption}
        exclusive
        onChange={(event, newOption) => setSelectedOption(newOption)}
        sx={{ width: '100%', marginBottom: '20px' }} // General styles for the group
      >
        <ToggleButton value="db" sx={styles.connectDB}>
          Connect DB
        </ToggleButton>
        <ToggleButton value="csv" sx={styles.uploadCSVButton}>
          Upload CSV
        </ToggleButton>
      </ToggleButtonGroup>

      {selectedOption === 'db' && (
        <form onSubmit={handleDbConnect} style={{ width: '100%' }}>
          <Stack spacing={2} direction="column" sx={{ width: '100%' }}>
            {<form onSubmit={handleDbConnect} style={{ width: '100%' }}>
          <Stack spacing={2} direction="column" sx={{ width: '100%' }}>
            <TextField
              label="Host"
              variant="outlined"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              fullWidth
              
            />
            <TextField
              label="Database"
              variant="outlined"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              fullWidth
            />
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            
          </Stack>
        </form>}
        <br>
        </br>
          </Stack>
          <div style={styles.submitButtonContainer}>
            <LoadingButton
              loading={isLoading}
              onClick={handleFileUpload}
              variant="contained"
              sx={styles.submitButton}
            >
              Submit
            </LoadingButton>
      </div>
        </form>
      )}

{selectedOption === 'csv' && (
    <Stack spacing={2} direction="column" sx={{ width: '100%' }}>
      <Typography sx={styles.uploadCSVLabel}>Upload file</Typography>
      <Button
        variant="contained"
        component="label"
        sx={styles.uploadCSVButton2}
      >
        Upload CSV
        <input
          type="file"
          hidden
          onChange={handleFileInputChange}
        />
      </Button>
      <div style={styles.submitButtonContainer}>
            <LoadingButton
              loading={isLoading}
              onClick={handleFileUpload}
              variant="contained"
              sx={styles.submitButton}
            >
              Submit
            </LoadingButton>
      </div>
    </Stack>
  )}

    </Stack>
  </div>
)}




// Helper function to create a new FileList since FileList itself is read-only
function FileListItems(files) {
  const b = new ClipboardEvent('').clipboardData || new DataTransfer();
  for (let i = 0, len = files.length; i<len; i++) b.items.add(files[i]);
  return b.files;
}

export default DragDropFiles;
