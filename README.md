# 🧩 Sudoku Solver

A simple and efficient Sudoku Solver built using React. This project takes a 9x9 Sudoku grid as input and fills in the correct numbers according to the classic Sudoku rules.

## 🚀 Features

- Solves standard 9x9 Sudoku puzzles
- Uses backtracking algorithm
- Interactive input/output grid (if connected to a frontend)
- Detects unsolvable boards
- Clean and readable codebase

## 🧠 Algorithm Used

The solver uses **Backtracking**, a recursive technique commonly used for constraint satisfaction problems like Sudoku.

1. Find the first empty cell.
2. Try placing numbers 1 through 9.
3. Check if the placement is valid.
4. Recursively solve the rest of the board.
5. Backtrack if needed.

## 🛠️ How to Use

### 💻 Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Jaypatwal102/SUDUKU_SOLVER.git
   cd SUDUKU_SOLVER
2.Open App.js in your vs code.

3. open new terminal in vs code type "npm run start" and then hit enter

4. Input your Sudoku puzzle (empty cells as 0) and hit "Solve".

✅ Valid Sudoku Rules
<br>
-> Each number 1–9 must appear once per row

-> Each number 1–9 must appear once per column

-> Each number 1–9 must appear once per 3×3 box
