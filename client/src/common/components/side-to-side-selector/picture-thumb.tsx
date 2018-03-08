import * as React from 'react';

interface PictureThumbProps {
    src?: string;
    placeholder: any;
    width: number | string;
    height: number | string;
    className?: string;
}

interface PictureThumbState {
    errorBefore: boolean;
    picture: string;
}

export default class PictureThumb extends React.Component<PictureThumbProps, PictureThumbState> {

    state = {
        errorBefore: false,
        picture: this.props.src || this.props.placeholder
    };

    componentWillReceiveProps(nextProps: PictureThumbProps) {
      if (nextProps.src && nextProps.src !== this.state.picture) {
          this.setState({picture: nextProps.src, errorBefore: false});
      }
    }

    onError = () => {
        this.setState({picture: this.props.placeholder, errorBefore: true});
    }

    render() {
        return (
            <img
                style={{
                    borderRadius: '50%',
                    width: this.props.width,
                    height: this.props.height,
                    margin: 'auto',
                    objectFit: 'cover'
                    }}
                className={this.props.className}
                src={this.state.picture}
                onError={!this.state.errorBefore ? this.onError : undefined}
            />
        );
    }
}
