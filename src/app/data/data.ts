export interface Heading {
    type: string;
    name: string;
}

export interface Data {
    headings: Heading[];
    items: any[];
}

export class DataError {
    errorNumber: number;
    message: string;
    localMessage: string;

    constructor(errorNumber: number, message: string, localMessage: string) {
        this.errorNumber = errorNumber;
        this.message = message;
        this.localMessage = localMessage;
    }
}