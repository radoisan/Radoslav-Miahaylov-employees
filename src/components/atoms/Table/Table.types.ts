import { Result } from "../../../interfaces/common";

interface IColumnConfig {
  columnName: string;
}

export interface ITable {
  data: Result[] | undefined;
  columnConfig: IColumnConfig[];
}
