import ViewBase from "../../shared/viewBase.js";
import LayoutBuilder from "./layoutBuilder.js";

console.log('hello console!');
export default class View extends ViewBase {
  #layoutBuilder;
  #components;
  constructor(layoutBuilder = new LayoutBuilder()) {
    super();
    this.#layoutBuilder = layoutBuilder;
  }

  configureFormClear(){}
  configureFormSubmit(){}

  render(items) {
    this.#components = this.#layoutBuilder
      .setScreen({title: 'User Management App'})
      .setLayout()
      .setForm({
        onSubmit: () => {},
        onClear: () => {}
      }).build();
  }
}
