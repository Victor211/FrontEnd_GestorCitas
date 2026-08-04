import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";
import { MobileDrawer } from "./components/MobileDrawer";
import { Sidebar } from "./components/Sidebar";
import { sidebarPreference } from "./sidebarPreference";

export function AppLayout() {
  const [collapsed, setCollapsed] = useState<boolean>(() =>
    sidebarPreference.getSidebarCollapsed(),
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    sidebarPreference.setSidebarCollapsed(collapsed);
  }, [collapsed]);

  return (
    <Box sx={{ display: "flex" }}>
      <Header collapsed={collapsed} onMenuClick={() => setMobileOpen(true)} />
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((prev) => !prev)}
      />
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <MainContent />
    </Box>
  );
}
