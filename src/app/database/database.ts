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
  columns: ColumnDef[];
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

