class TicTacToe {
    constructor(el, userScore, houseScore, modal, btnPlayAgain) {
        this.el = document.querySelector(el);
        this.rows = 3;
        this.cols = 3;
        this.modal = document.querySelector(modal);
        this.userScoreEl = document.querySelector(userScore);
        this.houseScoreEl = document.querySelector(houseScore);
        this.btnPlayAgain = document.querySelector(btnPlayAgain);

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

        this.userMoves = 0;
        this.playerCells = [];
        this.houseCells = [];
        this.foundWinner = false;
        this.userScore = 0;
        this.houseScore = 0;

        console.log(this.userScoreEl, this.houseScoreEl);
        this.generateBoard();
        this.bindEvents();
    }

    bindEvents() {
        this.el.addEventListener("click", (e) => {
            const cell = e.target.dataset["cell"];
            console.log("clicked", cell, typeof cell);
            if (this.userMoves < 5 || !this.foundWinner) {
                this.userMoves++;
                console.log(this.userMoves);
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
    }

    /**
     *
     * @param {String} cell
     */
    selectPlayerMove(cell) {
        const selectedCell = document.querySelector(`div[data-cell='${cell}']`);

        this.playerCells.push(cell);
        selectedCell.innerHTML = `<i class="uil uil-times-circle"></i>`;

        if (this.checkWinner(this.playerCells)) {
            console.log("User is the winner");
            this.userScore++;
            this.updateScore();
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
            this.houseScore++;
            this.updateScore();
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
                    (data.includes(a) || data.includes(d)) &&
                    (data.includes(b) || data.includes(d)) &&
                    (data.includes(c) || data.includes(d))
                ) {
                    console.log(
                        "winner",
                        data,
                        data.includes(a),
                        data.includes(b),
                        data.includes(c),
                        data.includes(d)
                    );

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

new TicTacToe(
    "#board",
    "#player-score",
    "#house-score",
    "#modal",
    "#btn-play-again"
);
