import * as React from 'react';
import TracesModal from './traces-modal';
import { Https } from '../../util/https';
import TracesStore from './store';

export interface TracesProps {
    object: string;
    id: number | string;
    dateFormat?: string;
    https: Https;
}

interface TracesState {
    showTraceModal: boolean;
}

export default class Traces extends React.Component<TracesProps, TracesState> {

    state = {
        showTraceModal: false
    };

    store: TracesStore;

    constructor(props: TracesProps) {
        super(props);
        this.store = new TracesStore(props.https);
    }

    showModal = async (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        const canShowModal = await this.store.fetchTraces(this.props.object, this.props.id);
        if (canShowModal) {
            this.setState({ showTraceModal: true });
        }
    }

    hideModal = () => {
        this.setState({ showTraceModal: false });
    }

    render() {
        return (
            <a onClick={this.showModal}>
                <i className="icon-history" />
                {
                    this.state.showTraceModal ? (
                        <TracesModal
                            show={this.state.showTraceModal}
                            onHide={this.hideModal}
                            dateFormat={this.props.dateFormat}
                            store={this.store}
                        />
                    ) : undefined
                }
            </a>
        );
    }
}
