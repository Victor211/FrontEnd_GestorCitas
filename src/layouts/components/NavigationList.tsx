import { List } from "@mui/material";
import { canAccessNavigationItem, navigationItems } from "../../app/router/navigation";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { NavigationItem } from "./NavigationItem";

interface NavigationListProps {
  collapsed: boolean;
  onNavigate?: () => void;
}

export function NavigationList({ collapsed, onNavigate }: NavigationListProps) {
  const { user } = useAuth();
  const visibleItems = navigationItems.filter((item) =>
    canAccessNavigationItem(item, user?.role),
  );

  return (
    <List component="nav" sx={{ px: 1 }}>
      {visibleItems.map((item) => (
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
