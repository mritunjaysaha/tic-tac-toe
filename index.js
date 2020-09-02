class TicTacToe {
    constructor(el, userScore, houseScore, modal, btnPlayAgain, winner) {
        this.el = document.querySelector(el);
        this.rows = 3;
        this.cols = 3;
        this.modal = document.querySelector(modal);
        this.userScoreEl = document.querySelector(userScore);
        this.houseScoreEl = document.querySelector(houseScore);
        this.btnPlayAgain = document.querySelector(btnPlayAgain);
        this.winner = document.querySelector(winner);

        this.winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        this.selectedCells = ["", "", "", "", "", "", "", "", ""];
        console.log(this.selectedCells);
        this.userMoves = 0;
        this.playerCells = [];
        this.houseCells = [];
        this.foundWinner = false;
        this.userScore = 0;
        this.houseScore = 0;
        this.wonBy = "";

        console.log(this.userScoreEl, this.houseScoreEl);
        this.generateBoard();
        this.bindEvents();
    }

    bindEvents() {
        this.el.addEventListener("click", (e) => {
            const cell = e.target.dataset["cell"];
            console.log("clicked", cell, typeof cell);
            this.selectedCells[cell] = "x";
            if (this.selectedCells.includes("")) {
                this.userMoves++;
                this.selectPlayerMove(cell);
            }
        });

        this.btnPlayAgain.addEventListener("click", () => {
            this.modal.style.display = "none";
            this.resetBoard();
        });
    }

    resetBoard() {
        this.el.innerHTML = "";
        this.selectedCells = ["", "", "", "", "", "", "", "", ""];

        this.generateBoard();
        this.userMoves = 0;
        this.playerCells = [];
        this.houseCells = [];
        this.foundWinner = false;
    }

    showModal() {
        this.modal.style.display = "flex";
    }

    updateScore() {
        this.showModal();
        this.userScoreEl.innerHTML =
            this.userScore < 10 ? `0${this.userScore}` : this.userScore;
        this.houseScoreEl.innerHTML =
            this.houseScore < 10 ? `0${this.houseScore}` : this.houseScore;
        this.winner.innerText = this.wonBy;
    }

    /**
     *
     * @param {String} cell
     */
    selectPlayerMove(cell) {
        const selectedCell = document.querySelector(`div[data-cell='${cell}']`);

        this.playerCells.push(Number.parseInt(cell, 10));
        selectedCell.innerHTML = `<i class="uil uil-times-circle"></i>`;

        console.log(this.checkWinner(this.playerCells));

        if (this.checkWinner(this.playerCells)) {
            console.log("User is the winner");
            this.userScore++;
            this.updateScore();
            return;
        }

        this.decideHouseMove();
    }

    decideHouseMove() {
        const cell = this.getHouseCell();
        this.selectedCells[cell] = "o";
        this.houseCells.push(cell);

        const selectedCell = document.querySelector(`div[data-cell='${cell}']`);

        selectedCell.innerHTML = `<i class="uil uil-circle"></i>`;

        if (this.checkWinner(this.houseCells)) {
            console.log("House is the winner");
            this.houseScore++;
            this.updateScore();
        }
    }

    /**
     *
     * @param {Array} element
     */
    checkWinner(element) {
        let winner = null;
        this.winningCombinations.forEach((combo) => {
            if (
                this.selectedCells &&
                this.selectedCells[combo[0]] === this.selectedCells[combo[1]] &&
                this.selectedCells[combo[0]] === this.selectedCells[combo[2]]
            ) {
                winner = this.selectedCells[combo[0]];
            }
        });

        if (winner) {
            this.wonBy = winner === "x" ? "you won" : "house won";
            return true;
        } else if (this.selectedCells.includes("")) {
            return false;
        } else {
            this.wonBy = "Draw";
            return true;
        }
    }

    getHouseCell() {
        const cell = this.generateRandomNumber();
        console.log(this.playerCells, this.houseCells);
        console.log(
            cell,
            !this.playerCells.includes(cell) && !this.houseCells.includes(cell)
        );
        if (
            !this.playerCells.includes(cell) &&
            !this.houseCells.includes(cell)
        ) {
            return cell;
        }
        return this.getHouseCell();
    }

    /**
     *
     * @param {Number} max
     */
    generateRandomNumber(max = 9) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    generateBoard() {
        const fragment = document.createDocumentFragment();
        let count = 0;
        for (let i = 0; i < this.rows; i++) {
            const rows = document.createElement("div");

            rows.classList.add("div-board-rows");

            for (let j = 0; j < this.cols; j++) {
                const cols = document.createElement("div");

                cols.classList.add("div-board-cols");
                cols.dataset["cell"] = `${count}`;
                count++;
                rows.appendChild(cols);
            }

            fragment.appendChild(rows);
        }

        this.el.appendChild(fragment);
    }
}

new TicTacToe(
    "#board",
    "#player-score",
    "#house-score",
    "#modal",
    "#btn-play-again",
    "#result"
);
