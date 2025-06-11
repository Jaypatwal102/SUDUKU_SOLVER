import { useState } from "react";

export default function App() {
  const [grid, setGrid] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );
  const [solved, setSolved] = useState(true);
  function setCell(r, c, value) {
    const grid1 = grid.map((row, i) =>
      row.map((cell, j) => (i === r && j === c ? value : cell))
    );
    setGrid(grid1);
  }

  function handleStart() {
    const reGrid = sudukuSolver(grid);
    console.log(reGrid);
    if (reGrid) {
      setGrid(reGrid);
      setSolved(true);
    } else {
      setSolved(false);
    }
  }
  function handleRestart() {
    const grid2 = Array.from({ length: 9 }, () => Array(9).fill(0));
    setGrid(grid2);
    setSolved(true);
  }
  return (
    <>
      <h1 className="text-center text-yellow-400 text-5xl font-bold underline">
        SUDUKU SOLVER
      </h1>
      <Element grid={grid} setCell={setCell} />

      <div className="flex justify-center mt-10 ">
        <button
          className="mr-20 bg-cyan-600 w-32 h-8 rounded-lg border-r-2 font-bold font-bold"
          onClick={handleStart}
        >
          SOLVE
        </button>
        <button
          className="ml-20 bg-cyan-600 w-32 h-8 rounded-lg border-r-2 font-bold font-bold"
          onClick={handleRestart}
        >
          RESET
        </button>
      </div>
      {!solved && (
        <h3 className="text-center text-red-600 text-2xl mt-10">
          Not Possible To Solve!!!!!
        </h3>
      )}
    </>
  );
}

function sudukuSolver(grid) {
  function isValidGrid(grid) {
    return grid.every((row) =>
      row.every((cell) => Number.isInteger(cell) && cell >= 0 && cell <= 9)
    );
  }
  if (!isValidGrid(grid)) return null;
  const grid2 = grid.map((row) => [...row]);
  function solve(grid) {
    let row = -1;
    let col = -1;
    let isEmpty = false;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const val = grid[i][j];

        // ✅ Check for invalid values
        if (val < 0 || val > 9) {
          return false;
        }

        // Check for empty cell
        if (val === 0) {
          row = i;
          col = j;
          isEmpty = true;
          break;
        }
      }
      if (isEmpty) break;
    }

    // If no empty cell is found, puzzle is solved
    if (!isEmpty) return true;

    for (let num = 1; num <= 9; num++) {
      if (isSafe(grid, row, col, num)) {
        grid[row][col] = num;

        if (solve(grid)) return true;

        grid[row][col] = 0; // backtrack
      }
    }

    return false;
  }

  function isSafe(grid, r, c, num) {
    for (let i = 0; i < 9; i++) {
      if (grid[i][c] === num) return false;
    }

    for (let j = 0; j < 9; j++) {
      if (grid[r][j] === num) return false;
    }

    const startRow = r - (r % 3);
    const startCol = c - (c % 3);
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (grid[i][j] === num) return false;
      }
    }
    return true;
  }
  if (solve(grid2)) {
    return grid2;
  }
  return null;
}

function Element({ grid, setCell }) {
  return (
    <div className="grid grid-cols-9 gap-1 border-black w-fit mx-auto mt-20 p-4">
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <input
            key={`${i}${j}`}
            value={cell}
            onChange={(e) => setCell(i, j, parseInt(e.target.value))}
            type="number"
            maxLength={1}
            className="w-10 h-10 border border-gray-800 text-center"
          />
        ))
      )}
    </div>
  );
}
