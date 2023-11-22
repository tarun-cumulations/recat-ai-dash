//@ts-nocheck
import { Button, Stack } from "@mui/material";
import { useRef, useState } from "react";
import csvImage from "../shared/images/csvImage.svg";
import frameImage from "../shared/images/Frame.svg";
import addMoreImage from "../shared/images/addMore.svg";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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

const CsvDragDropFiles = () => {
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


  const inputRef = useRef();

  const handleDragOver = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  // send files to the server
  const handleUpload = (event: React.SyntheticEvent) => {
    localStorage.setItem('currentContext', 'csv');
    event.preventDefault();
    setKpis([]);
    setIsFileUploaded(false);
    setQuestions([]);
    setIsLoading(true);
    const newFormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      newFormData.append("file[]", files[i]);
    }
    setFormData(newFormData);

    getKPIData(
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
    <>
      <Stack sx={{ padding: "40px" }}>
        <span
          style={{ fontWeight: 700, fontSize: "14px", marginBottom: "24px" }}
        >
          Upload File
        </span>
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
          <Stack
            direction="row"
            justifyContent={"center"}
            alignItems={"center"}
            margin={"5px"}
            gap={1}
            padding={"5px 0"}
          >
            <img src={csvImage} alt="csv" />
            <span
              style={{
                fontSize: "16px",
              }}
            >
              <b>Drag and drop file here or</b>
            </span>
            <Button
              sx={{ textTransform: "none" }}
              size={"small"}
              variant="outlined"
              onClick={() => inputRef.current.click()}
            >
              Browse
            </Button>
          </Stack>
          <div>
            <input
              type="file"
              multiple
              onChange={(event) => {
                if (concat && files !== null) {
                  const fileArray = [
                    ...Array.from(files),
                    ...event.target.files,
                  ];
                  const fileList = new DataTransfer();

                  fileArray.forEach((file) => {
                    fileList.items.add(file);
                  });

                  setFiles(fileList.files);
                  setConcat(false);
                } else {
                  setFiles(event.target.files);
                }
              }}
              accept=".csv"
              ref={inputRef}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <Stack
          margin={"16px 0 0 0"}
          justifyContent={"space-between"}
          direction={"row"}
        >
          <Stack>
            {files && !isEmpty(files) ? (
              <Stack direction="row" gap={1.2}>
                {Array.from(files).map((file, idx) => (
                  <Stack
                    sx={{
                      border: "1px dashed #BDBDBD",
                      width: "48px",
                      height: "48px",
                      borderRadius: "8px",
                      position: "relative",
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <img style={{ width: "24px" }} src={csvImage} alt="empty" />
                    <Stack
                      sx={{
                        background: "#E53535",
                        position: "absolute",
                        borderRadius: "50%",
                        width: "18px",
                        height: "18px",
                        top: "-5px",
                        right: "-5px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        const fileArray = Array.from(files).filter(
                          (fileData) => !isEqual(fileData, file)
                        );
                        const fileList = new DataTransfer();

                        fileArray.forEach((file) => {
                          fileList.items.add(file);
                        });

                        setFiles(fileList.files);
                      }}
                    >
                      <Close
                        fontSize={"18px"}
                        sx={{ margin: "auto", color: "#FFF" }}
                      />
                    </Stack>
                  </Stack>
                ))}
                <Stack
                  sx={{
                    border: "1px dashed #BDBDBD",
                    width: "48px",
                    height: "48px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  alignItems={"center"}
                  justifyContent={"center"}
                  onClick={() => {
                    setConcat(true);
                    inputRef.current.click();
                  }}
                >
                  <img
                    style={{ width: "24px" }}
                    src={addMoreImage}
                    alt="empty"
                  />
                </Stack>
              </Stack>
            ) : (
              <Stack
                sx={{
                  border: "1px dashed #BDBDBD",
                  width: "48px",
                  height: "48px",
                  borderRadius: "8px",
                }}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <img style={{ width: "24px" }} src={frameImage} alt="empty" />
              </Stack>
            )}
          </Stack>
          <Stack>
            <LoadingButton
              disabled={isLoading || files === null || isEmpty(files)}
              loading={isLoading}
              onClick={handleUpload}
              variant="contained"
              sx={{
                background: "#4FD1C5",
                width: "80px",
                height: "32px",
                fontSize: "12px",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Continue
            </LoadingButton>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default CsvDragDropFiles;
