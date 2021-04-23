export const NO_CONNECION = 'NONE';

export interface PropertyDefinition {
    id: number;
    description: string;
    required: boolean;
    masked: boolean;
}

export interface ConnectionType {
    label: string;
    description: string;
    propertyDefinitions: PropertyDefinition[];
}

export interface Property {
    propertyId: number;
    value: string;
}

export interface ConnectionDefinition {
    id: number;
    typeLabel: string;
    description: string;
    properties: Property[];
}

export interface ConnectionToken {
    token: string;
    description: string;
    type: string;
    page: string;
    valid: boolean;
    errorMessage: string;
}

export const STORED_CONNECTION_TOKEN: ConnectionToken = {
    token: window.localStorage.getItem('connection-token') + '',
    description: window.localStorage.getItem('connection-description') + '',
    type: window.localStorage.getItem('connection-type') + '',
    page: '',
    valid: window.localStorage.getItem('connection-token') !== null && window.localStorage.getItem('connection-token') !== '',
    errorMessage: ''
};
