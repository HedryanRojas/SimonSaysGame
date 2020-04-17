const txtTimer = document.getElementById('txt-timer')

class Timer {

    constructor() {
        this.increment = this.increment.bind(this)
        this.id = 0
        this.seconds = 0
        this.minutes = 0
    }

    start() {
        this.id = setInterval(this.increment, 1000)
    }

    stop() {
        clearInterval(this.id)
        txtTimer.innerHTML = '00:00'
    }

    increment() {
        let minutesAux, secondsAux;
        this.seconds++
        if (this.seconds > 59) {
            this.minutes++
            this.seconds = 0
        }
        secondsAux = this.seconds < 10 ? '0' + this.seconds : this.seconds
        minutesAux = this.minutes < 10 ? '0' + this.minutes : this.minutes

        txtTimer.innerHTML = `${minutesAux}:${secondsAux}`
    }
}