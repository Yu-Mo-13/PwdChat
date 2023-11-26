const APIURL: string = process.env.VITE_API_BASE_URL === undefined ? (import.meta.env.VITE_API_BASE_URL === undefined ? "" : import.meta.env.VITE_API_BASE_URL) : process.env.VITE_API_BASE_URL;
const getPassword = async (app: string, accountClas: string, account: string) => {
    const param = accountClas === '1' ? "app=" + app + "&account=" + account : "app=" + app;
    const response = await fetch(APIURL + "/pwd/" + param);
    const data = await response.json();
    return data[0].pwd;
}
export { getPassword };