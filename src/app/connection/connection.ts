export interface PropertyDefinition {
    propertyId: number;
    description: string;
    required: boolean;
    masked: boolean;
}

export interface ConnectionType {
    id: number;
    description: string;
    propertyDefinitions: PropertyDefinition[];
}

export interface Property {
    propertyId: number;
    value: string;
}

export interface ConnectionDefinition {
    id: number;
    typeId: number;
    description: string;
    properties: Property[]
}

export interface ConnectionToken {
    token: string;
    description: string;
    label: string;
    valid: boolean;
}