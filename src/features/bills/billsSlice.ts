import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from '../../app/store';
import {Bill} from "../../model/data/Bill";
import {fetchCount} from "../counter/counterAPI";
import {incrementAsync} from "../counter/counterSlice";
import {billsListAPIFactory} from "./billsListAPI";
import {BillsList} from "./BillsList";
import {EntryPoint} from "../../model/data/EntryPoint";


export interface IBillsState {
    isLoading: boolean;
    bills: Bill[];
    entryPoints: EntryPoint[];
}

const initialState: IBillsState = {
    isLoading: false,
    bills:[],
    entryPoints: []
};

export const billsSlice = createSlice({
    name: 'bills',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // changeMessage: (state,action: PayloadAction<string>) =>{
        //     state.helloMessage = action.payload;
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadBillsListAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadBillsListAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.entryPoints = action.payload[1];
                state.bills = action.payload[0]
            })
            .addCase(loadBillsListAsync.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

// export const loadBillsListAsync = createAsyncThunk(
//     'bills/loadingBills',
//     async () => {
//         return await billsListAPIFactory.api.loadBills(10,20);
//     }
// );

export const loadBillsListAsync = createAsyncThunk(
    'bills/loadingBills',
    () => {
        // Поиграем промисами.
        // Промис внутри промиса, что может быть лучше?
        // Наверное, Promise.All, но нам нужны точки для мокинга. Так описано в интерфейсе. Значит быть посему - сделаем так.
        // Не забыть вызвать resolve в нужном месте.
        return new Promise<[Bill[],EntryPoint[]]> ((resolve,reject)=>{
            billsListAPIFactory.api.loadEntryPoints().then((entryPoints)=>{
                billsListAPIFactory.api.loadBills(10,20,entryPoints).then((bills)=>{
                    resolve([bills,entryPoints])
                })

            })
        })
    }
);


export const selectIsLoading = (state: RootState) => state.bills.isLoading;
export const selectEntryPoints = (state: RootState) => state.bills.entryPoints;
export const selectBills = (state: RootState) => state.bills.bills;

export default billsSlice.reducer;
