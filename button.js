class Button {

    constructor(element, onSelect) {
        this.select = this.select.bind(this);
        this.element = element
        this.onSelect = onSelect
    }

    addClickListener() {
        this.element.addEventListener('click', this.select)
    }

    removeClickListener() {
        this.element.removeEventListener('click', this.select)
    }

    lightUp() {
        this.element.classList.add(`light`)
        setTimeout(() => this.resetColor(), 450)
    }

    resetColor() {
        this.element.classList.remove(`light`)
    }

    select(ev) {
        const color = ev.target.dataset.color;
        const number = this.colorToNumber(color);
        this.lightUp()
        this.onSelect(number)
    }

    colorToNumber(color) {
        switch (color) {
            case 'blue': return 0;
            case 'green': return 1;
            case 'pink': return 2;
            case 'yellow': return 3;
        }
    }
}