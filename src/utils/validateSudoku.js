export default function validateSudoku(grid) {
  // rows
  for (let i = 0; i < 9; i++) {
    const set = new Set();
    for (let j = 0; j < 9; j++) {
      const val = grid[i][j];
      if (val !== 0) {
        if (set.has(val)) return `Duplicate ${val} in row ${i + 1}`;
        set.add(val);
      }
    }
  }

  // columns
  for (let j = 0; j < 9; j++) {
    const set = new Set();
    for (let i = 0; i < 9; i++) {
      const val = grid[i][j];
      if (val !== 0) {
        if (set.has(val)) return `Duplicate ${val} in column ${j + 1}`;
        set.add(val);
      }
    }
  }

  // 3x3 boxes
  for (let r = 0; r < 9; r += 3) {
    for (let c = 0; c < 9; c += 3) {
      const set = new Set();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const val = grid[r + i][c + j];
          if (val !== 0) {
            if (set.has(val)) return `Duplicate ${val} in 3×3 box`;
            set.add(val);
          }
        }
      }
    }
  }

  return null;
}
