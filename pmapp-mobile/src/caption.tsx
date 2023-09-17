import * as CSS from 'csstype';

export const Caption = (props: any) => {
    const { caption } = props;

    const captionStyle: CSS.Properties = {
        width: '100%',
        height: '50px',
        fontSize: '25px',
        marginBottom: '10px',
        paddingRight: '10px',
        textAlign: 'center'
    };

    const captionText = caption;

    return (
        <p style={captionStyle}>{captionText}</p>
    );
}