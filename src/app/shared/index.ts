export class ServiceError {
    errorNumber: number;
    message: string;
    localMessage: string;

    constructor(errorNumber: number, message: string, localMessage: string) {
        this.errorNumber = errorNumber;
        this.message = message;
        this.localMessage = localMessage;
    }
}