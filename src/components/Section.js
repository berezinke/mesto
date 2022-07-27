export default class Section {
  constructor({renderer}, cardsPosition) {
    this._renderer = renderer;
    this._container = cardsPosition;
  };
  renderItems(initialArray) {
    initialArray.forEach(item => {
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