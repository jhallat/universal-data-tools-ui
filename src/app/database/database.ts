export interface TableDescription {
  name: string;
  schema: string;
}

export interface ViewDescription {
  name: string;
  schema: string;
}

export interface DatabaseDef {
  name: string;
  tables: TableDescription[];
  views: ViewDescription[];
}

export interface TableDef {
  name: string;
  schema: string;
  columns: ColumnDef[];
  primaryKey: string;
  rows: string[][];
}

export interface ColumnDef {
  name: string;
  defaultValue: string;
  isNullable: boolean;
  dataType: string;
  maxLength: number;
  numericPrecision: number;
  numericScale: number;
  updatable: boolean;
}

export interface CreateTableDef {
  database: string;
  schema: string;
  name: string;
  columns: CreateColumnDef[];
}

export interface CreateDatabaseDef {
  name: string;
  owner: string;
}

export interface CreateColumnDef {
  name: string;
  dataType: string;
  size: number;
  scale: number;
  precision: number;
  primaryKey: boolean;
  notNull: boolean;
  unique: boolean;
}

export interface DataTypeDef {
  name: string;
  isLengthProvided: boolean;
  isScaleProvided: boolean;
  isPrecisionProvided: boolean;
}


