import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { HEADER_HEIGHT } from "../constants";
import { Breadcrumbs } from "./Breadcrumbs";

export function MainContent() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minWidth: 0,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar sx={{ height: HEADER_HEIGHT, minHeight: `${HEADER_HEIGHT}px !important` }} />
      <Breadcrumbs />
      <Box
        component="section"
        sx={{ flexGrow: 1, px: { xs: 2, md: 3 }, pb: 4, overflowX: "hidden" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
