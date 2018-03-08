import * as React from 'react';
import {
    AutoSizer, Dimensions, Table, TableProps, Index, TableHeaderRowRenderer,
    SortDirectionType, Column, RowMouseEventHandlerParams
} from 'react-virtualized';
import NoData from '../../../../reports/common/formatters/bootstrap-table/no data/no-data-to-display';
import { VirtualizedColumn, VirtualizedColumnProps, SortFunc } from '../column/virtualized-column';
import 'react-virtualized/styles.css';
import './virtualized-table.css';
import { Options } from 'react-bootstrap-table';

interface SortFuncsMap <T = any> {
    [dataField: string]: SortFunc<T>;
}

interface ChildrenDescription<T> {
    props: VirtualizedColumnProps<T>;
}

interface OnHeaderClickData<T> {
     /*
        columnData is the given data on columnData prop for each Column component child
     */
    columnData: any;
    dataKey: keyof T;
    event: React.SyntheticEvent<React.MouseEvent<HTMLElement>>;
}

interface SortData<T> {
    sortBy: keyof T;
    sortDirection: SortDirectionType;
}

export interface VirtualizedTableProps<T = {}> {
    data: T[];
    children: any | any[];
    width?: number;
    height?: number;
    autoHeight?: boolean;
    disableHeader?: boolean;
    gridClassName?: string;
    gridStyle?: CSSStyleDeclaration;
    headerClassName?: string;
    headerStyle?: CSSStyleDeclaration;
    headerRowRenderer?: TableHeaderRowRenderer;
    id?: string;
    sortBy?: keyof T;
    sortDirection?: SortDirectionType;
    style?: React.CSSProperties;
    options?: Options;
    onHeaderClick?(params: OnHeaderClickData<T>): void;
    rowStyle?(data: {index: number}): CSSStyleDeclaration;
}

interface VirtualizedTableState<T = {}> {
    data: T[];
    sortBy?: string;
    sortDirection?: SortDirectionType;
}

export class VirtualizedTable<T = any> extends React.PureComponent<VirtualizedTableProps<T>, VirtualizedTableState<T>> {

    state = {
        data: this.props.data,
        sortBy: !!this.props.options ? this.props.options.defaultSortName : '',
        sortDirection: (!!this.props.options && !!this.props.options.defaultSortOrder)
            ? this.props.options.defaultSortOrder.toUpperCase() as any
            : ''
    };

    sortFunctions: SortFuncsMap<T> = {};

    componentWillMount() {
        const children = this.childrenToArray(this.props.children);
        this.sortFunctions = this.getSortFunctions(children);
    }

    componentDidMount() {
      if (this.shouldSort()) {
          this.handleSort({sortBy: this.state.sortBy as any, sortDirection: this.state.sortDirection});
      }
    }

    componentWillReceiveProps({ data }: VirtualizedTableProps<T>) {
        const { sortBy, sortDirection } = this.state;
        if (sortBy && sortDirection) {
            const sortedData = this.sortData(data, sortBy as keyof T, sortDirection);
            this.setState({data: sortedData});
        } else {
            this.setState({ data });
        }
    }

    genericSortData = (by: keyof T) => (aObj: T, bObj: T): number => {
        const a = typeof aObj[by] === 'string' ? (aObj[by] as any).toLowerCase() : aObj[by];
        const b = typeof bObj[by] === 'string' ? (bObj[by] as any).toLowerCase() : bObj[by];
        if (a > b) {
            return -1;
        }
        if (a < b) {
            return 1;
        }
        return 0;
    }

    shouldSort = () => Boolean(this.state.sortBy) && Boolean(this.state.sortDirection);
    
    externalSortFunction = (order: SortDirectionType, sortField: keyof T, externalFunc: SortFunc<T>) =>
        (a: T, b: T) => externalFunc(a, b, order.toLowerCase() as any, sortField)

    sortData = (data: T[], sortBy: keyof T, sortDirection: SortDirectionType) => {
        const sortFunction = Boolean(this.sortFunctions[sortBy])
            ? this.externalSortFunction(sortDirection, sortBy, this.sortFunctions[sortBy])
            : this.genericSortData(sortBy);
        const sortedData: T[] = data.sort(sortFunction);
        return sortDirection === 'DESC' ? sortedData : sortedData.reverse();
    }

    handleSort = ({sortBy, sortDirection}: SortData<T>) => {
        const data = this.sortData(this.state.data, sortBy, sortDirection);
        this.setState({data, sortDirection, sortBy});
    }

    childrenToArray = (children: TableProps['children']): ChildrenDescription<T>[] => 
        React.Children.toArray(children) as ChildrenDescription<T>[]

    getData = ({ index }: Index) => this.state.data[index];
    
    getSortFunctions = (children: ChildrenDescription<T>[]): SortFuncsMap<T> => children.reduce(
        (acc: SortFuncsMap<T>, {props}) => (
            typeof props.sortFunc === 'function' ? {...acc, [props.dataField]: props.sortFunc} : acc
        ),
        {})

    castChildren = (child: ChildrenDescription<T>[], width: number) => {
        const children = React.Children.toArray(child) as ChildrenDescription<T>[];
        return children.map(
            ({props}) => <Column key={`vt${props.dataField}`} {...VirtualizedColumn.parseProps(props, width)} />
        );
    }

    handleRowClick = ({ index }: RowMouseEventHandlerParams) => {
        const { options = {} } = this.props;
        if (typeof options.onRowClick === 'function') {
            options.onRowClick(this.state.data[index]);
        }
    }
    
    virtualizedTable = (state: VirtualizedTableState<T>) => (dimensions: Dimensions) => {
        const {
            width = dimensions.width, height = dimensions.width, children, options = {}, ...others
        } = this.props;
        const { data } = this.state;
        const child = this.childrenToArray(children);
        const rowCount = (Array.isArray(data)) ? data.length : (Boolean(data) ? 1 : 0);
        return (
            <Table
                {...others}
                className="react-bs-table"
                width={width}
                height={height}
                headerHeight={40}
                rowCount={rowCount}
                rowHeight={50}
                rowGetter={this.getData}
                noRowsRenderer={NoData as any}
                overscanRowCount={5}
                sortBy={this.state.sortBy}
                sortDirection={this.state.sortDirection}
                onRowClick={options.onRowClick && this.handleRowClick}
                sort={this.handleSort}
            >
                {this.castChildren(child, width)}
            </Table>
        );
    }

    render() {
        return (
            <AutoSizer disableHeight={true}>
                {this.virtualizedTable(this.state)}
            </AutoSizer>
        );
    }
}
