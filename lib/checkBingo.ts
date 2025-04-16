//storing past bingos
export interface PreviousBingos {
    rows: Set<number>;
    cols: Set<number>;
    diags: Set<number>; //0: top-left -> bottom-right; 1: top-right -> bottom-left
}

//listing all new bingos user hits --> no double count
interface BingoScore {
    score: number;
    newBingos: {
        type: 'row' | 'col' | 'diag';
        index: number;
    }[];
}

export function checkBingo(
    marked: number[],
    prev: PreviousBingos
): BingoScore {
    const markedSet = new Set(marked);
    const newBingos: BingoScore['newBingos'] = [];

    //checking rows
    for (let r = 0; r < 5; r++) {
        if (prev.rows.has(r)) continue; //if already counted
        //ex row = [10, 11, 12, 13, 14] by index 

        const row = Array.from({length: 5}, (_, i) => r * 5 + i)
        if (row.every(i => markedSet.has(i))) {
            prev.rows.add(r);
            newBingos.push({type: 'row', index: r});
        }
    }

    //checking columns
    for (let c = 0; c < 5; c++) {
        if (prev.cols.has(c)) continue;
        //ex column = [1, 6, 11, 16, 21] by index

        const col = Array.from({length: 5}, (_, i) => i * 5 + c)
        if (col.every(i => markedSet.has(i))) {
            prev.cols.add(c);
            newBingos.push({ type: 'col', index: c });
        }
    }

    //tl -> br diagonal
    if (!prev.diags.has(0)) {
        const diag1 = [0, 6, 12, 18, 24];
        if (diag1.every(i => markedSet.has(i))) {
          prev.diags.add(0);
          newBingos.push({ type: 'diag', index: 0 });
        }
    }

    //tr -> bl diagonal
    if (!prev.diags.has(1)) {
        const diag2 = [4, 8, 12, 16, 20];
        if (diag2.every(i => markedSet.has(i))) {
          prev.diags.add(1);
          newBingos.push({ type: 'diag', index: 1 });
        }
    }

    return {
        score: newBingos.length * 10,
        newBingos,
    };
}
