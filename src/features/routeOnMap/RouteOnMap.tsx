import {useAppSelector} from "../../app/hooks";
import {selectSelectedBill} from "../bills/billsSlice";
import {store} from "../../app/store";

export const RouteOnMap = () => {
    const selectedBill = useAppSelector(selectSelectedBill)

    return (<>
        {
            selectedBill === undefined &&
            <h1>Накладная не выбрана</h1>
        }

        {selectedBill !== undefined &&
            <>
                <div>
                    {selectedBill.name + " from:" + selectedBill.from.name + " to:" + selectedBill.to.name}
                </div>
                <div>
                    {store.getState().bills.selectedBill?.from.name}
                </div>
            </>
        }
    </>)
}