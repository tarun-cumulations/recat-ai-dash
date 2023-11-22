//@ts-nocheck
import { Button, Stack, Typography } from "@mui/material";
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

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const fileSelected = event.target.files;
    setFiles(fileSelected);
    console.log(fileSelected);
  };

  const handleButtonClick = () => {
    // Trigger the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // send files to the server
  const handleUpload = (event: React.SyntheticEvent) => {
    localStorage.setItem("currentContext", "csv");
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
      <Stack
        sx={{ width: "100%", height: "100%" }}
        justifyContent={"space-between"}
      >
        <Stack alignItems={"start"} width={"100%"} sx={{ marginLeft: "10px" }}>
          <span
            style={{ fontWeight: 700, fontSize: "14px", marginBottom: "10px" }}
          >
            Upload File
          </span>
          <Button
            disabled={isLoading}
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
            onClick={handleButtonClick}
          >
            Browse
          </Button>
          <input
            type="file"
            multiple
            accept=".csv"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />

          <Stack
            margin={"10px 0 0 0"}
            justifyContent={"space-between"}
            direction={"row"}
            width="100%"
          >
            <Stack
              gap={1}
              width="100%"
              height={"210px"}
              sx={{ overflowY: "auto" }}
            >
              {files !== null &&
                Array.from(files).map((file, idx) => (
                  <Stack
                    sx={{
                      border: "1px solid #e5e9f2",
                      width: "96%",
                      height: "32px",
                      minHeight: "32px",
                      borderRadius: "4px",
                      position: "relative",
                      padding: "0 10px",
                      background: "#f1f2f6",
                    }}
                    alignItems={"center"}
                    direction="row"
                    justifyContent={"space-between"}
                    onClick={() => {
                      console.log(file);
                    }}
                  >
                    <Stack direction="row" gap={3}>
                      <Typography fontWeight={600} variant={"body2"}>
                        {file.name}
                      </Typography>
                      <Typography
                        fontWeight={500}
                        variant={"body2"}
                        color={"#8391A7"}
                      >
                        {file.size} kb
                      </Typography>
                    </Stack>

                    <Stack
                      sx={{
                        width: "18px",
                        height: "18px",
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
                        sx={{ margin: "auto", color: "#8391A7" }}
                      />
                    </Stack>
                  </Stack>
                ))}
            </Stack>
          </Stack>
        </Stack>
        <Stack alignItems={"end"}>
          <LoadingButton
            disabled={isLoading || files === null || isEmpty(files)}
            loading={isLoading}
            onClick={handleUpload}
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
    </>
  );
};

export default CsvDragDropFiles;
