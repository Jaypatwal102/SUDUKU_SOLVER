export default function sudokuSolver(grid) {
  const board = grid.map((row) => [...row]);

  function isSafe(b, r, c, num) {
    for (let i = 0; i < 9; i++) {
      if (b[i][c] === num) return false;
      if (b[r][i] === num) return false;
    }

    const sr = r - (r % 3);
    const sc = c - (c % 3);

    for (let i = sr; i < sr + 3; i++) {
      for (let j = sc; j < sc + 3; j++) {
        if (b[i][j] === num) return false;
      }
    }

    return true;
  }

  function solve(b) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (b[i][j] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isSafe(b, i, j, num)) {
              b[i][j] = num;
              if (solve(b)) return true;
              b[i][j] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  return solve(board) ? board : null;
}
