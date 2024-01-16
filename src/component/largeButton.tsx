import * as CSS from 'csstype';

export const LargeButton = (props: any) => {
    const { caption, onClick, isEnabled } = props;

    const buttonStyle: CSS.Properties = {
        width: '7rem',
        height: '3rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '10px',
        marginTop: '15px',
        textAlign: 'center',
        backgroundColor: '#3cb371',
    };

    return (
        <button style={buttonStyle} onClick={onClick} disabled={!isEnabled}>{caption}</button>
    );
};