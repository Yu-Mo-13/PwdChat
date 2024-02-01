export const checkLogin = async (name: string, password: string) => {
  const APIURL: string = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(
    APIURL + "/user/engname=" + name + "&password=" + password
  );
  const data = await response.json();
  return data;
};
