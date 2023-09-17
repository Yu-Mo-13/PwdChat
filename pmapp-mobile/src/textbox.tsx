import * as CSS from 'csstype';

export const Textbox = (props: any) => {
    const { type, placeholder, onChange, val } = props;

    const textboxStyle: CSS.Properties = {
        width: '85%',
        height: '50px',
        fontSize: '20px',
        marginBottom: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc'
    };

    return (
        <input type={type} placeholder={placeholder} style={textboxStyle} onChange={onChange} value={val} />
    );
}