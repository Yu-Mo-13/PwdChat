import * as CSS from 'csstype';

export const SmallButton = (props: any) => {
    const { caption, onClick, isEnabled } = props;

    const buttonStyle: CSS.Properties = {
        width: '4rem',
        height: '3rem',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '10px',
        marginTop: '15px',
        textAlign: 'center',
        // disabledの場合は、濃いグレーにする
        backgroundColor: isEnabled ? '#3cb371' : '#808080'
    };

    return (
        <button style={buttonStyle} onClick={onClick} disabled={!isEnabled}>{caption}</button>
    );
};