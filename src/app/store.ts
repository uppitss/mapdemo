import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import billsReducer from '../features/bills/billsSlice'
export const store = configureStore({
  reducer: {
    bills:billsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
