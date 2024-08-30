import ViewBase from "../../shared/viewBase.js";
import LayoutBuilder from "./layoutBuilder.js";

export default class View extends ViewBase {
  #layoutBuilder;
  #components;
  #onClearButton;
  #onSubmitButton;
  #headers;
  #data = [];
  constructor(layoutBuilder = new LayoutBuilder()) {
    super();
    this.#layoutBuilder = layoutBuilder;
  }

  resetForm() {
    this.#components.form.reset();
    this.#components.screen.render();
  }

  notify({msg}) {
    this.#components?.alert.setMessage(msg);
    this.#components?.screen.render();
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


  #prepareData(items) {
    if (!items.length) {
        return {
            headers: this.#headers,
            data: []
        }
    }

    this.#headers = Object.keys(items[0])
    return {
        headers: this.#headers,
        data: items.map(item => Object.values(item))
    }
  }

  addRow(item) {
      this.#data.push(item)
      const items = this.#prepareData(this.#data)
      this.#components.table.setData(items)
      this.#components.screen.render()
  }

  render(items) {
    this.#components = this.#layoutBuilder
      .setScreen({title: 'User Management App'})
      .setLayout()
      .setForm({
        onSubmit: this.#onSubmitButton.bind(this),
        onClear: this.#onClearButton.bind(this)
      }).setAlertComponent().setTable({numColumns: 3})
      .build();

      items.forEach((item) => {
        this.addRow(item);
      })
  }
}
