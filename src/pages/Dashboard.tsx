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

export const Dashboard = () => {
  const kpis = useRecoilValue<string[]>(kpiAtom);
  const questions = useRecoilValue<string[]>(questionAtom);
  const isFileUploaded = useRecoilValue<boolean>(fileUploadAtom);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 30px)",
        background: "#F2F4F6",
        padding: "15px 60px",
        overflow: "hidden", 
      }}
    >
      <DbDetailsForm /> 
      <Box
        sx={{ margin: "0 57px", display: 'flex', flexDirection: 'row', gap: '20px' }}
      >
        {true && (
          <Box
            sx={{
              background: "#FFF",
              width: "480px", 
              borderRadius: "16px",
              flexShrink: 0, 
              overflow: "auto", 
            }}
          >

        {localStorage.getItem('currentContext') === 'db' ? <KPISection /> : <KPISectionCSV />}
          </Box>
        )}
        {(kpis.length > 0 || questions.length > 0) && true && (
          <Box
            sx={{
              background: "#FFF",
              flexGrow: 1, 
              borderRadius: "16px",
              overflow: "auto", 
            }}
          >
            <GraphSection />
          </Box>
        )}
      </Box>
    </Box>
  );
};
