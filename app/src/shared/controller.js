/**
 * @typedef {import('./viewBase.js').default} View
 * @typedef {import('./service.js').default} Service
 */
export default class Controller {
  /** @type {View} */
  #view;
  /** @type {Service} */
  #service;

  /**
   * @param { {view: View,service: Service}} deps
   *
   */
  constructor({view,service}) {
    this.#view = view;
    this.#service = service;
  }

  static async init(deps) {
    const controller = new Controller(deps);
    await controller.#init();
    return controller;
  }

  #isValid(data) {
    return data.name && data.age && data.email;
  }

  async #onSubmit(data) {
    if(!this.#isValid(data)) {
      this.#view.notify({msg : 'Please, check the inputs'});
      return;
    }
    try {
      await this.#service.createUser(data);
    }catch(err){
      this.#view.notify({msg: 'creation failed'})
    }

    this.#view.resetForm();
    const users = await this.#getUsersFromAPI();
    this.#view.render(users);


  }



  async #init() {
    this.#view.configureFormClear(() => {});
    this.#view.configureFormSubmit(this.#onSubmit.bind(this));
    const users = await this.#getUsersFromAPI();
    const initialData = [
      { name: 'Erick Wendel', age: 28, email: 'erick@erick.com' },
      { name: 'Ana Neri', age: 24, email: 'ana@ana.com' },
      { name: 'Marc Berg', age: 24, email: 'marc@marc.com' },
      ...users
    ]
    this.#view.render(initialData);
  }


  async #getUsersFromAPI() {
    try {
      return await this.#service.getUsers();
    } catch(err){
      this.#view.notify({msg: "Error getting data from server."});
      return [];
    }
  }
}
