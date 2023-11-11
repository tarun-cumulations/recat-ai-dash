import { Stack } from "@mui/material";
import emptyStateImage from "../shared/images/emptyState.svg";
import noDataImage from "../shared/images/noDataState.svg";

interface EmptyStateProps {
  isQueryEmpty?: boolean;
}

export const EmptyState = ({ isQueryEmpty = false }: EmptyStateProps) => {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      marginY={"auto"}
      gap={2}
    >
      <img
        src={isQueryEmpty ? noDataImage : emptyStateImage}
        width={"180px"}
        alt={"No data found"}
      />
      {isQueryEmpty ? (
        <div style={{ color: "#5A6679" }}>No data available</div>
      ) : (
        <>
          <div style={{ fontWeight: 700, marginTop: "30px" }}>
            Result Not Found
          </div>
          <div>This information is not available</div>
        </>
      )}
    </Stack>
  );
};
