import { Divider, Drawer, Toolbar, Typography } from "@mui/material";
import { DRAWER_WIDTH_EXPANDED } from "../constants";
import { NavigationList } from "./NavigationList";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{ display: { xs: "block", md: "none" } }}
      slotProps={{
        paper: {
          sx: { width: DRAWER_WIDTH_EXPANDED, boxSizing: "border-box" },
        },
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center", px: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
          Appointment Manager
        </Typography>
      </Toolbar>
      <Divider />
      <NavigationList collapsed={false} onNavigate={onClose} />
    </Drawer>
  );
}
