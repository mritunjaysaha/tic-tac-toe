class Board {
    constructor(el, rows = 3, cols = 3) {
        this.el = document.querySelector(el);
        this.rows = rows;
        this.cols = cols;

        this.emptyCell = 9;

        this.winningCombinations = [
            ["0:0", "0:1", "0:2"],
            ["1:0", "1:1", "1:2"],
            ["2:0", "2:1", "2:2"],
            ["0:0", "1:0", "2:0"],
            ["0:1", "1:1", "2:1"],
            ["0:2", "1:2", "2:2"],
            ["0:0", "1:1", "2:2"],
            ["0:2", "1:1", "2:0"],
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
            console.log("clicked", cell, typeof cell);
            if (this.emptyCell > 1) {
                this.selectPlayerMove(cell);
            }
        });
    }

    /**
     *
     * @param {String} cell
     */
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

    /**
     *
     * @param {Array} element
     */
    checkWinner(element) {
        let a = element[0];
        let b = element[1] ? element[1] : [];
        let c = element[2] ? element[2] : [];
        let d = element[3] ? element[3] : [];

        if (element.length >= 3) {
            for (let i = 0; i < this.winningCombinations.length; i++) {
                const data = this.winningCombinations[i];

                console.log(
                    data,
                    data.includes(a),
                    data.includes(b),
                    data.includes(c),
                    data.includes(d)
                );

                if (
                    (data.includes(a) === true || data.includes(d) === true) &&
                    (data.includes(b) === true || data.includes(d) === true) &&
                    (data.includes(c) === true || data.includes(d) === true)
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    getHouseCell() {
        const num1 = this.generateRandomNumber();
        const num2 = this.generateRandomNumber();
        const cell = `${num1}:${num2}`;
        if (
            !this.playerCells.includes(cell) &&
            !this.houseCells.includes(cell)
        ) {
            return cell;
        } else {
            return this.getHouseCell();
        }
    }

    /**
     *
     * @param {Number} max
     */
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
                cols.dataset["cell"] = `${i}:${j}`;

                rows.appendChild(cols);
            }

            fragment.appendChild(rows);
        }

        this.el.appendChild(fragment);
    }
}

new Board("#board");
