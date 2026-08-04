const ACCESS_TOKEN_KEY = "gestorcitas.accessToken";

function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function setAccessToken(token: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

function removeAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export const tokenStorage = {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
};
