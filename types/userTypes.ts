export type UserData = {
  _id: string;

  email: string;
  password: string;
  name: string;
  currentGame?: {
    marked: number[];
    tried: number[];
    completedRows: number[];
    completedCols: number[];
    completedDiags: number[];
    score: number;
  };
};
