import * as React from 'react';
import Image from '../html/image';

interface FormatExtraData {
    height?: number;
    width?: number;
    picturePlaceholder: string;
    className?: string;
    style?: React.HTMLProps<HTMLImageElement>;
    borderRadius?: string;
    title?: string;
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

export default function PictureCellFormat(picture: string, row: {}, formatExtraData: FormatExtraData) {
    const { height = 35, width = 35, borderRadius = '50%', imgProps = {} } = formatExtraData;

    return (
        <Image
            {...imgProps}
            className={formatExtraData.className}
            placeholder={formatExtraData.picturePlaceholder}
            src={picture}
            style={formatExtraData.style || {
                borderRadius,
                width: width,
                height: height,
                margin: 'auto',
                objectFit: 'cover'
            }}
            title={formatExtraData.title}
        />
    );
}