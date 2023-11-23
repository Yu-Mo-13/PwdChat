import * as CSS from 'csstype';

export const Listbox = (props: any) => {
    const { optionItems } = props;

    const listBoxStyle: CSS.Properties = {
        width: '100%',
        height: '50px',
        fontSize: '25px',
        marginBottom: '10px',
        paddingRight: '10px'
    };

    return (
        <select style={listBoxStyle}>
            {/* propsで渡された配列の個数分optionを生成 */}
            {optionItems.list.map((item: any) => {
                return <option value={item}>{item}</option>;
            })}
        </select>
    );
}