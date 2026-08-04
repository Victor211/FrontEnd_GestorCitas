const SIDEBAR_COLLAPSED_KEY = "gestorcitas.sidebarCollapsed";

function getSidebarCollapsed(): boolean {
  return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
}

function setSidebarCollapsed(collapsed: boolean): void {
  localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed));
}

export const sidebarPreference = {
  getSidebarCollapsed,
  setSidebarCollapsed,
};
