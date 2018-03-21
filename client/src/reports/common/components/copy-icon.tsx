import * as React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import * as copy from 'copy-to-clipboard';

export interface CopyIconProps {
    lat: string;
    lon: string;
}

interface CopyIconState {
    isCopied: boolean;
    shouldRenderTooltip: boolean;
}

export default class CopyIcon extends React.Component<CopyIconProps, CopyIconState> {

    state = {
        isCopied: false,
        shouldRenderTooltip: false
    };

    shouldComponentUpdate(nextProps: CopyIconProps, nextState: CopyIconState) {
        return this.state.isCopied !== nextState.isCopied
            || this.state.shouldRenderTooltip !== nextState.shouldRenderTooltip;
    }

    handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
        copy(event.currentTarget.id);
        this.setState({ isCopied: true });
    }

    handleMouseLeave = () => {
        this.setState({ isCopied: false, shouldRenderTooltip: false });
    }

    handleMouseEnter = () => {
        this.setState({ shouldRenderTooltip: true });
    }

    tooltip = () => (
        this.state.shouldRenderTooltip ? (
            <Tooltip id="available_tooltip">
                {this.state.isCopied
                    ? <FormattedMessage id="common.copy_icon.copied" />
                    : <FormattedMessage id="common.copy_icon.copy" />
                }
            </Tooltip>
        ) : <div />
    )

    render() {
        return (
            <OverlayTrigger placement="top" overlay={this.tooltip()}>
                <i
                    id={`${this.props.lat},${this.props.lon}`}
                    className="icon-clipboard"
                    onClick={this.handleClick}
                    onMouseLeave={this.handleMouseLeave}
                    onMouseEnter={this.handleMouseEnter}
                />
            </OverlayTrigger>
        );
    }
}