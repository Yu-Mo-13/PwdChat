import * as CSS from 'csstype';

export const Textbox = (props: any) => {
    const { type, id, placeholder, val, onChange } = props;

    const textboxStyle: CSS.Properties = {
        width: '85%',
        height: '50px',
        fontSize: '20px',
        marginBottom: '4px',
        paddingLeft: '10px',
        paddingRight: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc'
    };

    return (
        <input type={type} id={id} placeholder={placeholder} style={textboxStyle} value={val} onChange={onChange}/>
    );
}