import CircularProgress from "@mui/material/CircularProgress";
import { Fragment } from "react";
import { Box } from "@mui/material";

function GradientCircularProgress() {
  return (
    <Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
      />
    </Fragment>
  );
}

export default function Loader() {
  return (
    <Box
      spacing={2}
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
      }}
      data-testid="loader"
    >
      <GradientCircularProgress />
    </Box>
  );
}
