interface UseTokenReturn {
  token: string | null;
  updateToken: (tokenData: string) => void;
  wipeToken: () => void;
}

const loadTokenFromStorage = (): string | null => {
  const storageToken = window.localStorage.getItem('token');
  if (storageToken) {
    return storageToken;
  }
  return null;
};
const updateToken = (tokenData: string): void => {
  window.localStorage.setItem('token', tokenData);
};

const wipeToken = (): void => {
  window.localStorage.removeItem('token');
};

export const useToken = (): UseTokenReturn => {
  const token = loadTokenFromStorage();

  return {
    token,
    updateToken,
    wipeToken,
  };
};
