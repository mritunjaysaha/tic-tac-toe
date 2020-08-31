class Board {
    constructor(el, rows = 3, cols = 3) {
        this.el = document.querySelector(el);
        this.rows = rows;
        this.cols = cols;

        this.turn = {
            player: true,
            house: false,
        };

        this.playerCells = [];
        this.houseCells = [];

        this.generateBoard();
        this.bindEvents();
    }

    bindEvents() {
        this.el.addEventListener("click", (e) => {
            const cell = e.target.dataset["val"];
            const selectedCell = document.querySelector(
                `div[data-val='${cell}']`
            );

            this.playerCells.push(cell);
            selectedCell.innerHTML = `<i class="uil uil-times-circle"></i>`;
            this.decideHouseMove();
        });
    }

    decideHouseMove() {
        const cell = this.getHouseCell();

        this.houseCells.push(cell);

        const selectedCell = document.querySelector(`div[data-val='${cell}']`);

        selectedCell.innerHTML = `<i class="uil uil-circle"></i>`;
    }

    getHouseCell() {
        const num1 = this.generateRandomNumber();
        const num2 = this.generateRandomNumber();
        const cell = `${num1}${num2}`;
        console.log("cell", cell);
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
                cols.dataset["val"] = `${i}${j}`;

                rows.appendChild(cols);
            }

            fragment.appendChild(rows);
        }

        this.el.appendChild(fragment);
    }
}

new Board("#board");
