// テキストボックスから入力された値を取得する
function getText(inputId: string) {
    const input = document.getElementById(inputId) as HTMLInputElement;
    const text: string = input.value;
    return text;
}