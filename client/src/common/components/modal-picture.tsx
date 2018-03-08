import * as React from 'react';
import '../resources/styles/modal-picture.css';
import Img from './html/image';
import { FormattedMessage } from 'react-intl';

interface ModalPictureProps {
    picture?: string;
    picturePlaceholder?: string;
    onChangePicture: (picture: FileReader, valueName: string, pictureObj: File) => void;
    buttonText?: string;
    valueName?: string;
    getRef?: (ref: HTMLInputElement) => void;
    disabled?: boolean; 
}

export default function ModalPicture(props: ModalPictureProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { onChangePicture, valueName } = props;
        const { files } = event.target;
        const reader = new FileReader();
        reader.onload = () => {
            onChangePicture(reader.result, valueName || '', (files || [])[0]);
        };
        if (files) { reader.readAsDataURL(files[0]); }
    };

    return (
        <div className="col-sm-12">
            <div className="row center">
                <Img
                    placeholder={props.picturePlaceholder || ''}
                    src={props.picture}
                    className="mp-image"
                />
            </div>
            <div className="row center" style={{ padding: '10px' }}>
                <FormattedMessage id="global.change_picture">
                    {
                        (text: string) => (
                            <label htmlFor="mp-input" className="btn btn-default mp-button">
                                {text}
                            </label>
                        )
                    }
                </FormattedMessage>
                <input
                    id="mp-input"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    disabled={props.disabled}
                />
            </div>
        </div>
    );
}