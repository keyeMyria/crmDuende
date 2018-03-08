import * as React from 'react';
import PictureThumb from './picture-thumb';
import './option.css';

export interface OptionSelectorProps {
    option: object;
    pictureKey: string;
    picturePlaceholder: string | NodeRequire;
    titleKey: string;
    subtitleKey: string;
    isSelected?: boolean;
    disabled?: boolean;
    titleRenderer?(option: {}): JSX.Element | string;
    subTitleRenderer?(option: {}): JSX.Element | string;
    pictureRender?(option: {}): JSX.Element;
    onClick(option: object): void;
}

export default function OptionSelector(props: OptionSelectorProps) {

    const renderTitle = () => (
        <div className="side-selector-option-title">
            {props.titleRenderer
                ?   props.titleRenderer(props.option)
                :   props.option[props.titleKey]
            }
        </div>
    );

    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        props.onClick(props.option);
    };

    const renderSubtitle = () => (
        <div className="side-selector-option-sub">
            {props.subTitleRenderer
                ? props.subTitleRenderer(props.option)
                : props.option[props.subtitleKey]
            }
        </div>
    );

    const renderPicture = () => (
        <PictureThumb
            src={props.option[props.pictureKey]}
            placeholder={props.picturePlaceholder}
            width="32px"
            height="32px"
        />
    );

    return (
        <div className="side-side-option-container" onClick={onClick}>
            <div className={`${props.isSelected ? 'checked' : ''}`}>
                <i className="icon-check_circle selected-item" />
                {props.pictureRender
                    ? props.pictureRender(props.option)
                    : renderPicture()
                }
            </div>
            <div className="side-selector-option-desc">
                    {renderTitle()}
                    {renderSubtitle()}
            </div>
        </div>
    );
}
