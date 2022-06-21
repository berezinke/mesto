export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = containerSelector;
  };
  renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  };
  addItemAppend(element) {
    this._container.append(element);
  };
  addItemPrepend(element) {
    this._container.prepend(element);
  };
}