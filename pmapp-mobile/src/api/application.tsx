const APIURL: string = import.meta.env.VITE_API_BASE_URL;
const getAccountClas = async (app: string) => {
    const response = await fetch(APIURL + "/application/app=" + app);
    const data = await response.json();
    return data[0].accountClas;
}
const getAccountList = async (app: string) => {
    const response = await fetch(APIURL + "/account/app=" + app);
    const data = await response.json();
    const accountList: string[] = new Array(data.length);
    // 取得されたアカウントを配列に格納する
    for (let i = 0; i < data.length; i++) {
        accountList[i] = data[i].other_info;
    }
    return accountList;
}
export { getAccountClas, getAccountList };