import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {Bill} from "../../model/data/Bill";
import {billsListAPIFactory} from "./billsListAPI";
import {EntryPoint} from "../../model/data/EntryPoint";

var cloneDeep = require('lodash.clonedeep');
export interface IBillsState {
    isLoading: boolean;
    bills: Bill[];
    selectedBill:Bill|undefined;
    entryPoints: EntryPoint[];
}

const initialState: IBillsState = {
    isLoading: false,
    bills:[],
    selectedBill:undefined,
    entryPoints: []
};

export const billsSlice = createSlice({
    name: 'bills',
    initialState,
    reducers: {
         selectBill: (state,action: PayloadAction<Bill>) =>{
             state.selectedBill = action.payload//cloneDeep(action.payload);
         },
        updateBillFrom: (state,action:PayloadAction<{bill:Bill,entryPointId:number}>) =>{
             const billIndex = state.bills.findIndex(f=>f===action.payload.bill);
             if (billIndex >=0){
                 const entryPointIndex = state.entryPoints.findIndex(f=>f.id === action.payload.entryPointId)
                 if (entryPointIndex >=0){
                     state.bills = state.bills.map((i,index)=>{
                         if (index === billIndex){
                             i.from = state.entryPoints[entryPointIndex]
                         }
                         if (i === state.selectedBill){
                             const cloned =cloneDeep(i);
                             state.selectedBill = cloned;
                             return cloned;
                         }else{
                             return i;
                         }

                     })
                 }
             }
        },
        updateBillTo: (state,action:PayloadAction<{bill:Bill,entryPointId:number}>) =>{
            const billIndex = state.bills.findIndex(f=>f===action.payload.bill);
            if (billIndex >=0){
                const entryPointIndex = state.entryPoints.findIndex(f=>f.id === action.payload.entryPointId)
                if (entryPointIndex >=0){
                    state.bills = state.bills.map((i,index)=>{
                        if (index === billIndex){
                            i.to = state.entryPoints[entryPointIndex]
                        }
                        if (i === state.selectedBill){
                            const cloned =cloneDeep(i);
                            state.selectedBill = cloned;
                            return cloned;
                        }else{
                            return i;
                        }

                    })
                }
            }
        }
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

export const { selectBill,updateBillTo,updateBillFrom } = billsSlice.actions;

export const selectIsLoading = (state: RootState) => state.bills.isLoading;
export const selectEntryPoints = (state: RootState) => state.bills.entryPoints;
export const selectBills = (state: RootState) => state.bills.bills;
export const selectSelectedBill = (state:RootState) => state.bills.selectedBill;

export default billsSlice.reducer;
