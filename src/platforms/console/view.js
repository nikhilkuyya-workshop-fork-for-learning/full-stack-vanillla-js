import ViewBase from "../../shared/viewBase.js";
import LayoutBuilder from "./layoutBuilder.js";

console.log('hello console!');
export default class View extends ViewBase {
  #layoutBuilder;
  #components;
  #onClearButton;
  #onSubmitButton;

  constructor(layoutBuilder = new LayoutBuilder()) {
    super();
    this.#layoutBuilder = layoutBuilder;
  }

  resetForm() {
    this.#components.form.reset();
    this.#components.screen.render();
  }

  notify({msg}) {
    this.#components.alert.setMessage(msg);
    this.#components.screen.render();
  }

  configureFormClear(fn) {
    this.#onClearButton = () => {
      this.resetForm();
      return fn();
    }
  }

  configureFormSubmit(fn) {
    this.#onSubmitButton = (data) => {
      return fn(data);
    }
  }

  render(items) {
    this.#components = this.#layoutBuilder
      .setScreen({title: 'User Management App'})
      .setLayout()
      .setForm({
        onSubmit: this.#onSubmitButton.bind(this),
        onClear: this.#onClearButton.bind(this)
      }).setAlertComponent()
      .build();
  }
}
