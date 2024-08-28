/**
 * @typedef {import('./viewBase.js').default} View
 */
export default class Controller {
  /** @type {View} */
  #view;

  /**
   * @param { {view: View}} deps
   */
  constructor({view}) {
    this.#view = view;
  }

  static init(deps) {
    const controller = new Controller(deps);
    controller.#init();
    return controller;
  }

  #isValid(data) {
    return data.name && data.age && data.email;
  }

  #onSubmit(data) {
    if(!this.#isValid(data)) {
      this.#view.notify({msg : 'Please, check the inputs'});
      return;
    }

    this.#view.resetForm();
    this.#view.addRow(data);
  }



  #init() {
    this.#view.configureFormClear(() => {});
    this.#view.configureFormSubmit(this.#onSubmit.bind(this));
    const initialData = [
      { name: 'Erick Wendel', age: 28, email: 'erick@erick.com' },
      { name: 'Ana Neri', age: 24, email: 'ana@ana.com' },
      { name: 'Marc Berg', age: 24, email: 'marc@marc.com' },
    ]
    this.#view.render(initialData);
  }

}
