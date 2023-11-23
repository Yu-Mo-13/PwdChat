const APIURL: string = import.meta.env.VITE_API_BASE_URL;
const getPassword = async (app: string, accountClas: number) => {
    const param = accountClas === 1 ? "app=" + app : "app=" + app + "&account=" + accountClas;
    const response = await fetch(APIURL + "/pwd/" + param);
    const data = await response.json();
    return data[0].pwd;
}