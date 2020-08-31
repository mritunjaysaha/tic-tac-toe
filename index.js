class Board {
    constructor(el, rows = 3, cols = 3) {
        this.el = document.querySelector(el);
        this.rows = rows;
        this.cols = cols;

        this.emptyCell = 9;

        this.winningCombinations = [
            JSON.stringify(["00", "01", "02"]),
            JSON.stringify(["10", "11", "12"]),
            JSON.stringify(["20", "21", "22"]),
            JSON.stringify(["00", "10", "20"]),
            JSON.stringify(["01", "11", "21"]),
            JSON.stringify(["02", "12", "22"]),
            JSON.stringify(["00", "11", "22"]),
            JSON.stringify(["02", "11", "20"]),
        ];

        this.playerCells = [];
        this.houseCells = [];

        this.generateBoard();
        this.bindEvents();

        /**
         * TODO: 1. Decide Winner
         * TODO: 2. Play Again Button [should appear in modal with fade animation]
         * TODO: 3. Update scores
         * TODO: 4. Higlight cells of the winner
         */
    }

    bindEvents() {
        this.el.addEventListener("click", (e) => {
            const cell = e.target.dataset["cell"];
            console.log(cell);
            if (this.emptyCell > 1) {
                this.selectPlayerMove(cell);
            }
        });
    }

    selectPlayerMove(cell) {
        const selectedCell = document.querySelector(`div[data-cell='${cell}']`);

        this.playerCells.push(cell);
        selectedCell.innerHTML = `<i class="uil uil-times-circle"></i>`;

        this.emptyCell -= 2;

        if (this.checkWinner(this.playerCells)) {
            console.log("User is the winner");
            return;
        }

        this.decideHouseMove();
    }

    decideHouseMove() {
        const cell = this.getHouseCell();

        this.houseCells.push(cell);

        const selectedCell = document.querySelector(`div[data-cell='${cell}']`);

        selectedCell.innerHTML = `<i class="uil uil-circle"></i>`;

        if (this.checkWinner(this.houseCells)) {
            console.log("House is the winner");
            return;
        }
    }

    checkWinner(element) {
        console.log(this.winningCombinations.includes(JSON.stringify(element)));
        return this.winningCombinations.includes(JSON.stringify(element));
    }

    getHouseCell() {
        const num1 = this.generateRandomNumber();
        const num2 = this.generateRandomNumber();
        const cell = `${num1}${num2}`;
        if (
            !this.playerCells.includes(cell) &&
            !this.houseCells.includes(cell)
        ) {
            return cell;
        } else {
            return this.getHouseCell();
        }
    }

    generateRandomNumber(max = 3) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    generateBoard() {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < this.rows; i++) {
            const rows = document.createElement("div");

            rows.classList.add("div-board-rows");

            for (let j = 0; j < this.cols; j++) {
                const cols = document.createElement("div");

                cols.classList.add("div-board-cols");
                cols.dataset["cell"] = `${i}${j}`;

                rows.appendChild(cols);
            }

            fragment.appendChild(rows);
        }

        this.el.appendChild(fragment);
    }
}

new Board("#board");
