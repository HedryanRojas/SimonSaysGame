const blue = document.getElementById('btn-blue')
const green = document.getElementById('btn-green')
const pink = document.getElementById('btn-pink')
const yellow = document.getElementById('btn-yellow')
const btnStart = document.getElementById('btn-start')
const txtLevel = document.getElementById('txt-level')

const FINAL_LEVEL = 10;
const APP_NAME = 'Simon says';

class Game {

    constructor() {
        this.timer = new Timer()
        this.init()
        this.generateSequence()
        setTimeout(this.nextLevel, 500)
    }

    init() {
        this.nextLevel = this.nextLevel.bind(this)
        this.resetGame = this.resetGame.bind(this)
        this.checkIfSelectedColorIsCorrect = this.checkIfSelectedColorIsCorrect.bind(this)
        this.timer.start()
        this.toggleBtnStart()
        this.toggleLevelLabel()
        this.level = 1
        this.buttons = [
            new Button(blue, this.checkIfSelectedColorIsCorrect),
            new Button(green, this.checkIfSelectedColorIsCorrect),
            new Button(pink, this.checkIfSelectedColorIsCorrect),
            new Button(yellow, this.checkIfSelectedColorIsCorrect),
        ]
    }

    toggleBtnStart() {
        if (btnStart.classList.contains('hide'))
            btnStart.classList.remove('hide')
        else
            btnStart.classList.add('hide')
    }

    toggleLevelLabel() {
        if (txtLevel.classList.contains('hide'))
            setTimeout(() => txtLevel.classList.remove('hide'), 500)
        else
            txtLevel.classList.add('hide')
    }

    generateSequence() {
        this.sequence = new Array(FINAL_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    nextLevel() {
        txtLevel.innerText = `Level: ${this.level}`
        this.subLevel = 0
        this.runSequence()
        this.initClickListeners()
    }

    runSequence() {
        for (let i = 0; i < this.level; i++) {
            let actual = this.sequence[i]
            setTimeout(() => this.buttons[actual].lightUp(), 1000 * i)
        }
    }

    initClickListeners() {
        this.buttons.forEach(button => button.addClickListener());
    }

    clearClickListeners() {
        this.buttons.forEach(button => button.removeClickListener());
    }

    checkIfSelectedColorIsCorrect(selectedButton) {
        if (selectedButton === this.sequence[this.subLevel]) {
            this.subLevel++
            this.hasCompletedSequenceCorrectly()
        } else
            this.lose()
    }

    hasCompletedSequenceCorrectly() {
        if (this.subLevel === this.level) {
            this.level++
            this.clearClickListeners()
            this.checkIfGameHasFinished();
        }
    }

    checkIfGameHasFinished() {
        if (this.level === (FINAL_LEVEL + 1)) {
            this.win()
        } else {
            setTimeout(this.nextLevel, 1500)
        }
    }

    win() {
        swal(APP_NAME, 'Congratulations, you won the game!', 'success').then(this.resetGame)
    }

    lose() {
        swal(APP_NAME, 'Sorry, you lost the game :(', 'error').then(this.resetGame)
    }

    resetGame() {
        this.clearClickListeners()
        this.timer.stop()
        this.toggleBtnStart()
    }
}

function start() {
    window.game = new Game();
}