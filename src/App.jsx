import { useState } from "react";
import SudokuGrid from "./components/SudokuGrid";
import sudokuSolver from "./utils/sudokuSolver";
import validateSudoku from "./utils/validateSudoku";

export default function App() {
  const [grid, setGrid] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0)),
  );

  const [status, setStatus] = useState(null);

  function setCell(r, c, value) {
    if (value < 0 || value > 9 || isNaN(value)) return;

    const newGrid = grid.map((row, i) =>
      row.map((cell, j) => (i === r && j === c ? value : cell)),
    );

    setGrid(newGrid);
  }

  function handleSolve() {
    const error = validateSudoku(grid);

    if (error) {
      setStatus({
        type: "error",
        message: error,
      });
      return;
    }

    const solved = sudokuSolver(grid);

    if (solved) {
      setGrid(solved);
      setStatus({
        type: "success",
        message: "Puzzle solved successfully!",
      });
    } else {
      setStatus({
        type: "error",
        message: "Valid puzzle but no solution exists.",
      });
    }
  }

  function handleReset() {
    setGrid(Array.from({ length: 9 }, () => Array(9).fill(0)));
    setStatus(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10">
      <h1 className="text-4xl font-bold">Sudoku Solver</h1>

      <p className="text-gray-500 mb-4">Enter numbers (1–9) and click Solve</p>

      {status && (
        <div
          className={`px-4 py-2 rounded mb-4 ${
            status.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status.message}
        </div>
      )}

      <SudokuGrid grid={grid} setCell={setCell} />

      <div className="flex gap-6 mt-6">
        <button
          onClick={handleSolve}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Solve
        </button>

        <button onClick={handleReset} className="border px-6 py-2 rounded">
          Reset
        </button>
      </div>
    </div>
  );
}
