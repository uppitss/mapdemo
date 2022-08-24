import {EntryPoint} from "./EntryPoint";

export class Bill {
    public name: string;
    public from: EntryPoint;
    public to: EntryPoint;

    constructor(name: string, from: EntryPoint, to: EntryPoint) {
        this.name = name;
        this.from = from;
        this.to = to;
    }
}