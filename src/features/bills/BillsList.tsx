import {Button, Spin, Table} from 'antd';
import {selectIsLoading, loadBillsListAsync, selectEntryPoints, selectBills} from "./billsSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useEffect} from "react";
import {ColumnsType} from "antd/lib/table";
import {Bill} from "../../model/data/Bill";

export const BillsList = () => {
    const isLoading = useAppSelector(selectIsLoading);
    const entryPoints = useAppSelector(selectEntryPoints);
    const bills = useAppSelector(selectBills)
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("MOUNT")
        dispatch(loadBillsListAsync())
    }, [])


    const columns: ColumnsType<Bill> = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Name2',
            dataIndex: 'name',
        }
    ];

    return (<>
        {
            isLoading &&
            <Spin size="large" tip={"Загрузка ..."}/>
        }
        {!isLoading &&
            <>
                <table>
                    <thead>
                    <tr>
                        <th>Поле 1</th>
                        <th>Поле 2</th>
                        <th>Поле 3</th>
                        <th>Поле 4</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Строка 1-1</td>
                        <td>Строка 1-2</td>
                        <td>Строка 1-3</td>
                        <td>Строка 1-4</td>
                    </tr>
                    <tr>
                        <td>Строка 2-1</td>
                        <td>Строка 2-2</td>
                        <td>Строка 2-3</td>
                        <td>Строка 2-4</td>
                    </tr>
                    </tbody>
                </table>


                <Table
                    // rowSelection={{
                    //     type: selectionType,
                    //     ...rowSelection,
                    // }}
                    columns={columns}
                    dataSource={bills}
                />
                <br/>

                <Button onClick={() => {
                    //dispatch(changeMessage("eeee"))
                }}>
                    Изменить
                </Button>
            </>
        }
    </>)
}