export default class Section {
    constructor( {renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    prependItem(element) {
        this._container.prepend(element);
    }

    appendItem(element) {
        this._container.append(element);
    }

    clear() {
        this._container.innerHTML = '';
    }

    renderItems(items) {
        this.clear();

        items.forEach((item) => {
            this._renderer(item);
        });
    }
}