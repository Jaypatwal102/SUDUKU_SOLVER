export default function SudokuGrid({ grid, setCell }) {
  return (
    <div className="grid grid-cols-9 gap-[2px] bg-black p-2 rounded">
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <input
            key={`${i}-${j}`}
            type="number"
            value={cell === 0 ? "" : cell}
            onChange={(e) => setCell(i, j, parseInt(e.target.value || 0))}
            className={`w-12 h-12 text-center text-lg border
              ${(j + 1) % 3 === 0 && j !== 8 ? "border-r-4" : ""}
              ${(i + 1) % 3 === 0 && i !== 8 ? "border-b-4" : ""}
            `}
          />
        )),
      )}
    </div>
  );
}
