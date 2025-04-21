export interface GameState {
  marked: number[];
  tried: number[];
  completedRows: number[];
  completedCols: number[];
  completedDiags: number[];
  score: number;
}

export interface UserData {
  _id?: string;
  email?: string;
  password?: string;
  name?: string;
  games: {
    board1: GameState;
    board2: GameState;
  };
}
