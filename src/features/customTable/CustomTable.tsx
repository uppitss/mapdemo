import {Select} from "antd";

export enum CustomTableColumnType {

    Text = "Text",
    Input = "Input",
    Select = "Select",
}

export interface ICustomTableColumn<T> {
    type: CustomTableColumnType; //Тип столбца
    title: string;
    key: string;
    placeholder?: string
    width?: number,
    minWidth?: number;

    getOptions?: (item:T) => { label: string, value: any }[]
    getSelectedOption?: (item: T) => string | undefined

    getFooter?: () => React.ReactChild;
}

export interface ICustomTableProps<T> {
    bindColl: T[]
    columns: ICustomTableColumn<T>[],

    onChangeRow: (row: T, key: string, value: any) => void;
    onSelectRow: (row: T) => void;

    isRowSelect: (row: T) => boolean

    showFooter?: () => boolean;
}

export const CustomTable = <T, >(props: ICustomTableProps<T>) => {

    return (
        <table style={{width: "100%"}}>
            <thead>
            <tr>
                {
                    props.columns.map((column, index) => {
                        return (
                            <th key={"CustomTableTh_" + index}
                                style={{width: column.width, minWidth: column.minWidth}}>
                                {column.title}
                            </th>
                        )
                    })
                }
            </tr>
            </thead>
            <tbody>
            {
                props.bindColl.map((row, rowIndex) => {
                    return (
                        <tr key={"CustomTableRow_" + rowIndex}
                            style={{
                                whiteSpace: "nowrap",
                                backgroundColor: props.isRowSelect(row) ? "limegreen" : undefined,
                                cursor: "pointer",
                                border: "1px solid gray"
                            }} onClick={(e) => {
                            props.onSelectRow(row)
                        }}>
                            {
                                props.columns.map((column, columnIndex) => {
                                    return (
                                        <td style={{borderRight: "1px solid gray"}}
                                            key={"CustomTableColumn_" + rowIndex + "_" + columnIndex}>
                                            {
                                                column.type === CustomTableColumnType.Select &&
                                                <Select
                                                    style={{width: "100%", paddingLeft: "5px", paddingRight: "5px"}}
                                                    value={column.getSelectedOption !== undefined ? column.getSelectedOption(row) : null}
                                                    options={column.getOptions !== undefined ? column.getOptions(row) : undefined}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                    }}
                                                    onChange={(value) => {
                                                        props.onChangeRow(row, column.key, value);
                                                    }}/>
                                            }

                                            {
                                                column.type === CustomTableColumnType.Text &&
                                                row[column.key as never]
                                            }

                                            {
                                                column.type === CustomTableColumnType.Input &&
                                                <span>INPUT</span>
                                            }
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )
                })
            }

            {
                (props.showFooter !== undefined && props.showFooter()) &&
                <tr>
                    {
                        props.columns.map((column, index) => {
                            return (
                                <td key={"CustomTableFooter_" + index}>
                                    {
                                        column.getFooter !== undefined &&
                                        column.getFooter()
                                    }
                                </td>
                            )
                        })
                    }
                </tr>

            }
            </tbody>
        </table>)
}