import * as React from 'react';

export interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    placeholder: string;
}

interface ImgState {
    hasError: boolean;
    src: string;
}

export default class Img extends React.Component<ImgProps, ImgState> {

    state = {
        hasError: false,
        src: this.props.src || this.props.placeholder
    };

    componentWillReceiveProps(nextProps: ImgProps) {
        if (nextProps.src !== this.props.src && !this.state.hasError) {
            this.setState({ src: nextProps.src || '' });
            return true;
        }
        return false;
    }

    onImageError = () => {
        this.setState({ src: this.props.placeholder });
    }

    render() {
        return (
            <img
                {...this.props}
                src={this.state.src}
                onError={!this.state.hasError ? this.onImageError : undefined}
            />
        );
    }
}
