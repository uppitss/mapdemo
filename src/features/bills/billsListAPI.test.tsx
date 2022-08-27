import {billsListAPIFactory} from "./billsListAPI";

test('Фабрика в текущей реализации вернет 10 моковых точек доставки',async ()=>{
  const api = billsListAPIFactory.api;
  const result = await api.loadEntryPoints();
  expect(result.length).toBe(10)
})

test('Выдает нужное количество моковых накладных',async ()=>{
  const api = billsListAPIFactory.api;
  const result = await  api.loadBills(10,11,await  api.loadEntryPoints());
  expect(result.length).toBeGreaterThanOrEqual(10);
  expect(result.length).toBeLessThanOrEqual(11);
})