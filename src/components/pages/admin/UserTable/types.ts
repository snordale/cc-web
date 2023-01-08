export interface UserTableData {
  id: string;
  createdAt: string;
  username: string;
  spotifyId: string;
  permission: string;
  token: string;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof UserTableData
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export type Order = "asc" | "desc";

export interface HeadCell {
  disablePadding: boolean;
  id: keyof UserTableData;
  label: string;
  numeric: boolean;
}
