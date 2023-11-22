import { Box, Stack } from "@mui/material";
import DbDetailsForm from "../components/DbDetails";
import CsvDragDropFiles from "../components/CsvDragFiles";
import { KPISection } from "../components/KPISection";
import { GraphSection } from "../components/GraphSection";
import { useRecoilValue } from "recoil";
import kpiAtom from "../models/kpiAtom";
import questionAtom from "../models/questionAtom";
import fileUploadAtom from "../models/fileUploadAtom";
import { KPISectionCSV } from "../components/KPISectionCsv";
import { useNavigate } from "react-router-dom";
import { Details } from "./Details";
import { useEffect } from "react";

export const Dashboard = () => {
  const isFileUploaded = useRecoilValue<boolean>(fileUploadAtom);
  const navigate = useNavigate();
  const kpis = useRecoilValue<string[]>(kpiAtom);
  const questions = useRecoilValue<string[]>(questionAtom);

  useEffect(() => {
    console.log(kpis, questions);
    if (kpis.length > 0 || questions.length > 0) {
      navigate("/details");
    }
  }, [kpis, questions]);

  return (
    <Box
      sx={{
        height: "calc(100vh - 30px)",
        background: "#F2F4F6",
        padding: "15px 60px",
        overflow: "hidden",
      }}
    >
      <DbDetailsForm />
    </Box>
  );
};
