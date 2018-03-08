import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn, SortOrder } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import DateCellFormat from '../bootstrap-table/date-cell-format';
import TracesStore from './store';
import { observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

interface TracesModalProps {
    show: boolean;
    onHide: () => void;
    dateFormat?: string;
    store: TracesStore;
}

const defaultSortOrder: SortOrder = 'desc';

const options = {
    defaultSortName: 'trace_date',
    sizePerPageList: [50],
    sizePerPage: 50,
    noDataText: <FormattedMessage id="global.bootstrap_table.no_data" />,
    defaultSortOrder
};

@observer
export default class TracesModal extends React.PureComponent<TracesModalProps> {

    componentWillUnmount() {
        this.props.store.resetTraces();
    }

    renderTable = () => {
        return (
            <BootstrapTable
                data={this.props.store.traces}
                striped={true}
                hover={false}
                pagination={true}
                ignoreSinglePage={true}
                options={options}
            >
                <TableHeaderColumn
                    isKey={true}
                    dataField="trace_date"
                    dataSort={true}
                    width="33%"
                    dataFormat={DateCellFormat}
                    formatExtraData={{
                        format: this.props.dateFormat
                    }}
                >
                    <FormattedMessage id={'global.traces.date'} />
                </TableHeaderColumn>
                <TableHeaderColumn dataField="who" dataSort={true} width="33%">
                    <FormattedMessage id={'global.traces.who'} />
                </TableHeaderColumn>
                <TableHeaderColumn dataField="did_what" dataSort={true} width="33%">
                    <FormattedMessage id={'global.traces.what'} />
                </TableHeaderColumn>
            </BootstrapTable>
        );
    }

    renderLoading = () => (
        <p className="react-loading"><FormattedMessage id={'global.loading'} /></p>
    )

    renderModal = () => (
        <Modal show={this.props.show && !this.props.store.isFetching} onHide={this.props.onHide}>
            <Modal.Header closeButton={true}>
                <Modal.Title>
                    <FormattedMessage id={'global.traces.title'} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="traces-table">
                    {
                        this.props.store.isFetching ? this.renderLoading() : this.renderTable()
                    }
                </div>
            </Modal.Body>
        </Modal>
    )

    render() {
        return this.renderModal();
    }
}