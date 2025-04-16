export type UserData = {
    _id: string;

    email: string;
    password: string;
    name: string;
    currentGame? : {
        marked: number[];
        completedRows: number[];
        completedCols: number[];
        completedDiags: number[]
    };
};