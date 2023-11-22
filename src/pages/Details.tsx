import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { KPISection } from "../components/KPISection";
import { KPISectionCSV } from "../components/KPISectionCsv";
import { GraphSection } from "../components/GraphSection";
import questionAtom from "../models/questionAtom";
import kpiAtom from "../models/kpiAtom";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

export const Details = () => {
  const navigate = useNavigate();
  const kpis = useRecoilValue<string[]>(kpiAtom);
  const questions = useRecoilValue<string[]>(questionAtom);

  useEffect(() => {
    if (kpis.length === 0 || questions.length === 0) {
      navigate("/");
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
      <Box
        sx={{
          margin: "0 57px",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            background: "#FFF",
            width: "480px",
            borderRadius: "16px",
            flexShrink: 0,
            overflow: "auto",
          }}
        >
          {localStorage.getItem("currentContext") === "db" ? (
            <KPISection />
          ) : (
            <KPISectionCSV />
          )}
        </Box>

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
      </Box>
    </Box>
  );
};
