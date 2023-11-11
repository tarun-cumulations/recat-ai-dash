import { Stack } from "@mui/material";
import DragDropFiles from "../components/DragFiles";
import { KPISection } from "../components/KPISection";
import { GraphSection } from "../components/GraphSection";
import { useRecoilValue } from "recoil";
import kpiAtom from "../models/kpiAtom";
import questionAtom from "../models/questionAtom";
import fileUploadAtom from "../models/fileUploadAtom";

export const Dashboard = () => {
  const kpis = useRecoilValue<string[]>(kpiAtom);
  const questions = useRecoilValue<string[]>(questionAtom);
  const isFileUploaded = useRecoilValue<boolean>(fileUploadAtom);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 30px)",
        background: "#F2F4F6",
        padding: "15px 60px",
      }}
    >
      <Stack
        sx={{
          background: "#FFF",
          height: "245px",
          margin: "13px 57px 30px",
          borderRadius: "16px",
          minWidth: "1090px",
        }}
      >
        <DragDropFiles />
      </Stack>
      <Stack
        direction={"row"}
        gap={4}
        sx={{ margin: "0 57px", minHeight: "560px" }}
      >
        {isFileUploaded && (
          <Stack
            sx={{
              background: "#FFF",
              minWidth: "480px",
              borderRadius: "16px",
            }}
          >
            <KPISection />
          </Stack>
        )}
        {(kpis.length > 0 || questions.length > 0) && isFileUploaded && (
          <Stack
            sx={{
              background: "#FFF",
              minWidth: "580px",
              width: "100%",
              borderRadius: "16px",
            }}
          >
            <GraphSection />
          </Stack>
        )}
      </Stack>
    </div>
  );
};
