import * as CSS from 'csstype';

export const Listbox = (props: any) => {
    const { optionItems, isEnabled } = props;

    const listBoxStyle: CSS.Properties = {
        width: '95%',
        height: '50px',
        fontSize: '20px',
        marginBottom: '10px',
        paddingRight: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc'
    };

    return (
        <select style={listBoxStyle}>
            {/* propsで渡された配列の個数分optionを生成 */}
            {optionItems.map((item: any) => {
                return <option value={item} disabled={!isEnabled}>{item}</option>;
            })}
        </select>
    );
}