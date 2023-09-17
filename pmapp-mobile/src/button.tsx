import * as CSS from 'csstype';

export const Button = (props: any) => {
    const { caption, onClick } = props;

    const buttonStyle: CSS.Properties = {
        width: '30%',
        height: '50px',
        fontSize: '18px',
        marginBottom: '10px',
        marginTop: '15px',
        paddingLeft: '10px',
        paddingRight: '10px',
        textAlign: 'center',
        backgroundColor: '#3cb371'
    };

    return (
        <button style={buttonStyle} onClick={onClick}>{caption}</button>
    );
};