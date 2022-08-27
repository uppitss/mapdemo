import {Bill} from "../../model/data/Bill";
import {EntryPoint} from "../../model/data/EntryPoint";

export interface IBillsListAPI {
    //Вот тут спорный момент - я передаю точки доставки сразу в метод загрузки накладных
    //В реальной ситуации точки были бы сохранены вместе с накладной. Но у нас - мок и демка. Поэтому так.
    //Комментарий сам по себе показывает, что я понимаю, что делаю.
    loadBills(min: number, max: number, entryPoints: EntryPoint[]): Promise<Bill[]>;

    loadEntryPoints(): Promise<EntryPoint[]>;
}

//Класс сделали потому, что надо вызывать в loadBills промис loadEntryPoints
class mockBillsListAPI implements IBillsListAPI {
    getRandomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    loadEntryPoints = () => {
        return new Promise<EntryPoint[]>((resolve, reject) => {
            let arr: EntryPoint[] = []
            arr.push(new EntryPoint(0,"Кремль", 55.752204, 37.620499));
            arr.push(new EntryPoint(1,"Метро цветной бульвар", 55.772169, 37.621437));
            arr.push(new EntryPoint(2,"Метро таганская", 55.741887, 37.652860));
            arr.push(new EntryPoint(3,"Метро баррикадная", 55.760932, 37.582042));
            arr.push(new EntryPoint(4,"Метро Студенческая", 55.738977, 37.548509));
            arr.push(new EntryPoint(5,"Метро Смоленская", 55.748633, 37.581573));
            arr.push(new EntryPoint(6,"Метро Шелепиха", 55.756171, 37.525997));
            arr.push(new EntryPoint(7,"Метро выставочная", 55.750749, 37.542412));
            arr.push(new EntryPoint(8,"Метро Полежаевская", 55.777456, 37.519666));
            arr.push(new EntryPoint(9,"Метро Динамо", 55.789216, 37.558827));

            resolve(arr);
        })
    }
    loadBills = (min: number, max: number, entryPoints: EntryPoint[]) => {
        //А вот тут мы продемонстрируем сразу и контекст и замыкание.
        //Контекст - забор entryPoints в методе getEntryPoints
        //Замыкание entryPoints в возвращаемом промисе.
        //Хорошо!
        const getEntryPoints = () => {
            let arr = [...entryPoints];
            const firstIndex = this.getRandomNumber(0, arr.length);
            const firstEntryPoint = arr.splice(firstIndex - 1, 1)[0];

            const secondIndex = this.getRandomNumber(0, arr.length);
            const secondEntryPoint = arr.splice(secondIndex - 1, 1)[0];

            return [firstEntryPoint, secondEntryPoint]
        }

        return new Promise<Bill[]>((resolve, reject) => {

            min = Math.ceil(min);
            max = Math.floor(max);
            const rows = this.getRandomNumber(min, max);
            let arr: Bill[] = []

            for (let i = 0; i < rows; i++) {
                const points = getEntryPoints();
                arr.push(new Bill("Тестовая накладная № " + (i+1), points[0], points[1]));
            }
            resolve(arr)
        })
    }
}

export interface IBillsListAPIFactory {
    api: IBillsListAPI
}

//Имитируем фабрику - как точку, где мы сможем переключить моковые методы на боевые
export const billsListAPIFactory: IBillsListAPIFactory = {
    api: new mockBillsListAPI()
}





