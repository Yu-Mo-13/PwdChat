import "cross-fetch/polyfill";

const getPassword = async (
  app: string,
  accountClas: string,
  account: string
) => {
  const APIURL: string = import.meta.env.VITE_API_BASE_URL;
  const param =
    accountClas === "1" ? "app=" + app + "/account=" + account : "app=" + app;
  const response = await fetch(APIURL + "/password/" + param);
  const data = await response.json();
  return data.pwd;
};
export { getPassword };
