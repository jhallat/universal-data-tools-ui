import { Key } from "./key";

export interface Table {
    name: string;
    size: number;
    keys: Key[];
}
