import Chart from "react-apexcharts";
import { LinearProgress, Stack, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { OutputData } from "../services/helper";
import graphTypeAtom from "../models/graphTypeAtom";
import { isEmpty } from "lodash";
import graphDataAtom from "../models/graphDataAtom";
import { EmptyState } from "./EmptyState";
import errorAtom from "../models/errorAtom";
import loadingAtom from "../models/loadingAtom";
import textResponseAtom from "../models/textResponseAtom";
import dataTypeAtom from "../models/dataTypeAtom";
import queryAtom from "../models/queryAtom";

export const GraphSection = () => {
  const graphData = useRecoilValue<OutputData>(graphDataAtom);
  const dataType = useRecoilValue<string>(dataTypeAtom);
  const textResponse = useRecoilValue<string>(textResponseAtom);
  const query = useRecoilValue<string>(queryAtom);
  const graphType = useRecoilValue<string>(graphTypeAtom);
  const error = useRecoilValue<string>(errorAtom);
  const isLoading = useRecoilValue<boolean>(loadingAtom);

  return (
    <>
      {isLoading ? (
        <Stack
          justifyContent={"center"}
          padding={"25px"}
          margin={"auto"}
          gap={3}
        >
          <div style={{ fontWeight: 700 }}> Please Wait, Loading </div>
          <LinearProgress />
        </Stack>
      ) : (
        <Stack height={"100%"} padding={"20px"}>
          <Typography
            sx={{ fontWeight: 700 }}
            marginLeft={"20px"}
            marginBottom={"20px"}
          >
            {query}
          </Typography>
          {dataType === "graph" ? (
            !isEmpty(graphData.series[0].data) && graphType !== undefined ? (
              <Chart
                options={JSON.parse(JSON.stringify(graphData?.options))}
                series={JSON.parse(JSON.stringify(graphData?.series))}
                // @ts-ignore
                type={graphType}
                height={"560px"}
              />
            ) : (
              error !== "" && <EmptyState />
            )
          ) : dataType === "text" ? (
            <Stack
              sx={{
                padding: "12px",
                borderRadius: "14px",
                boxShadow: "0 2px 24px #dae1e7",
              }}
              height={"560px"}
            >
              {textResponse}
            </Stack>
          ) : (
            error !== "" && <EmptyState />
          )}
        </Stack>
      )}
    </>
  );
};
