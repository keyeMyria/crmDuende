import * as React from 'react';
import '../resources/styles/modal-picture.css';
import Img from './html/image';

interface ModalPictureProps {
    picture?: any;
    picturePlaceholder?: string;
    valueName?: string;
    getRef?: (ref: HTMLInputElement) => void;
    labelClassNames?: string;
}

export default function ModalPicture(props: ModalPictureProps) {

    return (
        <div className={props.labelClassNames || "col-sm-12"}>
            <div className="row center">
                <div>
                    <Img
                        placeholder={props.picturePlaceholder || ''}
                        src={props.picture}
                        className="mp-image"
                    />
                </div>
            </div>
        </div>
    );
}