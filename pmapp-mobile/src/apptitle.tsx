import * as CSS from 'csstype';

export const AppTitle = (props: any) => {
    const { caption } = props;

    const captionStyle: CSS.Properties = {
        width: '100%',
        height: '3rem',
        fontSize: '1.5rem',
        textAlign: 'center'
    };

    const captionText = caption;

    return (
        <p style={captionStyle}>{captionText}</p>
    );
}