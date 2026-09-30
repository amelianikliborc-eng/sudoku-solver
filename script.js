const grid = document.getElementById("sudoku-grid");


// ========================================
// TWORZENIE PLANSZY 9 × 9
// ========================================

for (let row = 0; row < 9; row++) {

    for (let col = 0; col < 9; col++) {

        const input = document.createElement("input");

        input.type = "text";
        input.classList.add("cell");

        input.maxLength = 1;

        grid.appendChild(input);
    }
}


// ========================================
// POZWALAMY WPISYWAĆ TYLKO CYFRY 1–9
// ========================================

document.querySelectorAll(".cell").forEach(cell => {

    cell.addEventListener("input", () => {

        cell.value = cell.value.replace(/[^1-9]/g, "");

    });

});


// ========================================
// SPRAWDZANIE, CZY LICZBA MOŻE BYĆ WSTAWIONA
// ========================================

function isValid(board, row, col, number) {

    // Sprawdzamy wiersz

    for (let x = 0; x < 9; x++) {

        if (board[row][x] === number) {
            return false;
        }
    }


    // Sprawdzamy kolumnę

    for (let x = 0; x < 9; x++) {

        if (board[x][col] === number) {
            return false;
        }
    }


    // Sprawdzamy kwadrat 3 × 3

    const startRow = row - (row % 3);
    const startCol = col - (col % 3);

    for (let i = 0; i < 3; i++) {

        for (let j = 0; j < 3; j++) {

            if (board[startRow + i][startCol + j] === number) {
                return false;
            }
        }
    }


    return true;
}


// ========================================
// ALGORYTM ROZWIĄZUJĄCY SUDOKU
// ========================================

function solveSudoku(board) {

    // Szukamy pustego pola

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            if (board[row][col] === 0) {


                // Próbujemy liczby od 1 do 9

                for (let number = 1; number <= 9; number++) {

                    if (isValid(board, row, col, number)) {

                        // Wstawiamy liczbę

                        board[row][col] = number;


                        // Sprawdzamy, czy dalej da się rozwiązać Sudoku

                        if (solveSudoku(board)) {
                            return true;
                        }


                        // Jeżeli nie, cofamy zmianę

                        board[row][col] = 0;
                    }
                }


                // Żadna liczba nie pasuje

                return false;
            }
        }
    }


    // Nie ma już pustych pól

    return true;
}


// ========================================
// POBIERANIE SUDOKU Z PLANSZY
// ========================================

function getBoard() {

    const board = [];

    const cells = document.querySelectorAll(".cell");


    for (let row = 0; row < 9; row++) {

        board[row] = [];

        for (let col = 0; col < 9; col++) {

            const index = row * 9 + col;

            const value = cells[index].value;


            if (value === "") {
                board[row][col] = 0;
            } else {
                board[row][col] = Number(value);
            }
        }
    }


    return board;
}


// ========================================
// POKAZYWANIE ROZWIĄZANIA
// ========================================

function displayBoard(board) {

    const cells = document.querySelectorAll(".cell");


    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            const index = row * 9 + col;

            cells[index].value = board[row][col];
        }
    }
}


// ========================================
// PRZYCISK „ROZWIĄŻ”
// ========================================

document
    .getElementById("solve-button")
    .addEventListener("click", () => {

        const board = getBoard();

        const solved = solveSudoku(board);


        if (solved) {

            displayBoard(board);

            document.getElementById("message").textContent =
                "Sudoku zostało rozwiązane.";

        } else {

            document.getElementById("message").textContent =
                "Tego Sudoku nie da się rozwiązać.";
        }

    });


// ========================================
// PRZYCISK „WYCZYŚĆ”
// ========================================

document
    .getElementById("clear-button")
    .addEventListener("click", () => {

        document
            .querySelectorAll(".cell")
            .forEach(cell => {
                cell.value = "";
            });


        document.getElementById("message").textContent = "";

    });
