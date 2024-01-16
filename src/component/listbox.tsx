import * as CSS from 'csstype';

export const Listbox = (props: any) => {
    const { id, optionItems, onChange, isEnabled } = props;

    const listBoxStyle: CSS.Properties = {
        width: '220px',
        height: '50px',
        fontSize: '20px',
        marginBottom: '10px',
        paddingRight: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        maxWidth: '95%',
        // はみ出す場合は、・・・で省略する
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    };

    return (
        <select style={listBoxStyle} onChange={onChange}>
            {/* propsで渡された配列の個数分optionを生成 */}
            {optionItems.map((item: any) => {
                return <option id={id} value={item} disabled={!isEnabled}>{item}</option>;
            })}
        </select>
    );
}