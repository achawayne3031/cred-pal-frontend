import { reactLocalStorage } from "reactjs-localstorage";

export const setTheme = (themeName: string) => {
  localStorage.setItem("theme", themeName);
  document.body.className = themeName;
};

export const saveToken = (token: string) => {
  reactLocalStorage.set("@cred_pal_token", token);
};

export const getToken = () => {
  const token = reactLocalStorage.get("@cred_pal_token");
  return token ? token : null;
};

export const saveData = (data: any) => {
  reactLocalStorage.set("@cred_pal_user", JSON.stringify(data));
};

export const getData = () => {
  const storedUser: any = reactLocalStorage.get("@cred_pal_user");
  const jsonStored = storedUser ? JSON.parse(storedUser) : null;
  return jsonStored;
};

export const logOut = () => {
  reactLocalStorage.remove("@cred_pal_user");
  reactLocalStorage.remove("@cred_pal_token");
};
