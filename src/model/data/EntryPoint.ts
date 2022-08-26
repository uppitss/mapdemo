export class EntryPoint {
    id:number;
    name:string;
    latitude:number;
    longtitude:number;

    constructor(id:number,name:string,latitude:number,longtitude:number) {
        this.name = name;
        this.id = id;
        this.latitude = latitude;
        this.longtitude = longtitude;
    }
}