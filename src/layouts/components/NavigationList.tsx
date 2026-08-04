import { List } from "@mui/material";
import { navigationItems } from "../../app/router/navigation";
import { NavigationItem } from "./NavigationItem";

interface NavigationListProps {
  collapsed: boolean;
  onNavigate?: () => void;
}

export function NavigationList({ collapsed, onNavigate }: NavigationListProps) {
  return (
    <List component="nav" sx={{ px: 1 }}>
      {navigationItems.map((item) => (
        <NavigationItem
          key={item.id}
          item={item}
          collapsed={collapsed}
          onNavigate={onNavigate}
        />
      ))}
    </List>
  );
}
