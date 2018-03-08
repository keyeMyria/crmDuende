import * as React from 'react';
import { ColumnProps, TableCellProps } from 'react-virtualized';
import { SortOrder } from 'react-bootstrap-table';

export type DataFormat<T, U> = (cell: U, row: T, formatExtraData: any) => JSX.Element | string;

export type SortFunc<T = any> = (a: T, b: T, order: SortOrder, sortField: keyof T) => number;

export interface VirtualizedColumnProps<T = any, U = any> {
    dataField: keyof T;
    width: number | string;
    formatExtraData?: any;
    dataFormat?: DataFormat<T, U>;
    children?: JSX.Element;
    dataSort?: boolean;
    sortFunc?: SortFunc<T>;
}

export class VirtualizedColumn<T extends {} = any, U = any>
    extends React.Component<VirtualizedColumnProps<T, U>> {

    static parseWidth = (width: string | number, parentWidth: number) => {
        if (typeof width === 'number') {
            return width * parentWidth;
        }
        return (parseFloat(width) * 0.01) * parentWidth;
    }

    static cellRenderer = (dataFormat?: DataFormat<any, any>) => {
        if (!!dataFormat && typeof dataFormat === 'function') {
            return ({ cellData, rowData, columnData }: TableCellProps) => {
                return dataFormat(cellData, rowData, columnData);
            };
        } else {
            return undefined;
        }
    }

    static parseProps = (props: VirtualizedColumnProps<any, any>, parentWidth: number): ColumnProps => {
        const { width, dataField, dataFormat, formatExtraData, children, dataSort = false } = props;
        const columnProps: ColumnProps = {
            dataKey: dataField,
            width: VirtualizedColumn.parseWidth(width, parentWidth),
            columnData: formatExtraData,
            cellRenderer: VirtualizedColumn.cellRenderer(dataFormat),
            flexGrow: 1,
            label: children as any,
            disableSort: !dataSort
        };
        return columnProps;
    }
}
