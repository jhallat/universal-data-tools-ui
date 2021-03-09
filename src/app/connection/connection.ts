export class ConnectionError {
    errorNumber: number;
    message: string;
    localMessage: string;

    constructor(errorNumber: number, message: string, localMessage: string) {
        this.errorNumber = errorNumber;
        this.message = message;
        this.localMessage = localMessage;
    }
}

export interface ConnectionType {
    id: number;
    description: string;
}

export interface ConnectionDefinition {
    id: number;
    typeId: number;
    description: string;
    url: string;
}

export interface ConnectionToken {
    token: string;
    description: string;
    valid: boolean;
}