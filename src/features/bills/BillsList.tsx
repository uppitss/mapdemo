import {Spin} from 'antd';
import {
    selectIsLoading,
    loadBillsListAsync,
    selectEntryPoints,
    selectBills,
    selectBill,
    selectSelectedBill, updateBillFrom, updateBillTo
} from "./billsSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useEffect} from "react";
import {Bill} from "../../model/data/Bill";
import {CustomTable, CustomTableColumnType, ICustomTableColumn} from "../customTable/CustomTable";

export const BillsList = () => {
    const isLoading = useAppSelector(selectIsLoading);
    const entryPoints = useAppSelector(selectEntryPoints);
    const bills = useAppSelector(selectBills)
    const selectedBill = useAppSelector(selectSelectedBill)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadBillsListAsync())
    }, [])


    const getColumns = () => {
        let arr: ICustomTableColumn<Bill>[] = []

        arr.push({
            type: CustomTableColumnType.Text,
            title: "Название",
            key: "name",

        })

        arr.push({
            type: CustomTableColumnType.Select,
            title: "Откуда",
            key: "placeFrom",
            width: 250,
            minWidth: 200,
            getOptions: (item) => {
                return entryPoints.filter(f => f.id !== item.to.id).map((i) => {
                    return {label: i.name, value: i.id}
                })
            },
            getSelectedOption: (item) => {
                return item.from.name;
            }
        })

        arr.push({
            type: CustomTableColumnType.Select,
            title: "Куда",
            key: "placeTo",
            width: 250,
            minWidth: 200,
            getOptions: (item) => {
                return entryPoints.filter(f => f.id !== item.from.id).map((i) => {
                    return {label: i.name, value: i.id}
                })
            },
            getSelectedOption: (item) => {
                return item.to.name;
            }
        })

        return arr;
    }

    return (<>
        {
            isLoading &&
            <Spin size="large" tip={"Загрузка ..."}/>
        }
        {!isLoading &&
            <>
                <div style={{padding: "10px"}}>
                    <CustomTable bindColl={bills}
                                 columns={getColumns()}
                                 onChangeRow={(row, key, value) => {
                                     switch (key) {
                                         case "placeFrom":
                                             dispatch(updateBillFrom({bill: row, entryPointId: (value as number)}))
                                             break;
                                         case "placeTo":
                                             dispatch(updateBillTo({bill: row, entryPointId: (value as number)}))
                                             break;
                                     }
                                 }}
                                 onSelectRow={(row) => {
                                     dispatch(selectBill(row))
                                 }}
                                 isRowSelect={(row) => {
                                     return row === selectedBill
                                 }}/>
                </div>
            </>
        }
    </>)
}