import ViewBase from './../../shared/viewBase.js';

export default class View extends ViewBase {
  #name = document.querySelector('#name');
  #age = document.querySelector('#age');
  #email = document.querySelector('#email');
  #tableBody = document.querySelector('.flex-table');
  #form = document.querySelector('#form');
  #btnClear = document.querySelector("#btnFormClear");
  #notify = document.querySelector('#notifyDiv')

  /**
   * Configures the clear action for the form.
   *  When the clear button is clicked, the form fields are reset.
   * @param {Function} fn - The callback function to execute on form submission.
    * @returns {void}
  */
  configureFormClear(fn) {
    this.#btnClear.addEventListener('click',() => {
      this.resetForm();
      return fn();
    })
  }
  /**
     * Configures the form submission behavior.
     * When the form is submitted, the provided callback function is executed with the form data.
     * @param {Function} fn - The callback function to execute on form submission.
     * @returns {void}
  */
  configureFormSubmit(fn) {
    this.#form.addEventListener('submit',async (event) => {
      event.preventDefault();
      const name = this.#name.value;
      const age = this.#age.value;
      const email = this.#email.value;
      return await fn({name,age,email});
    })
  }

  /**
   * Resets the form fields to their initial state.
   * @returns {void}
  */
  resetForm() {
    this.#form.reset();
  }

  /**
   * Displays a notification to the user.
   * This method can be overridden to change how notifications are presented.
   * @param {Object} notification - The notification to display.
   * @param {string} notification.msg - The message to display to the user.
   * @param {boolean} notification.isError - Whether the message is an error.
   * @returns {void}
   */
   notify({ msg, isError }) {
      this.#notify.classList.remove('d-none');
      this.#notify.textContent = msg;
      setTimeout(() => {
        this.#notify.classList.add('d-none');
      },3000)
   }

  /**
   * Adds a new row of data to the display.
   * @param {FormData} data - The data to add.
   * @returns {void}
  */
  addRow(data) {
    const row = document.createElement('div');
    row.classList.add('flex-table-row');

    row.innerHTML = `
    <div>${data.name}</div>
    <div>${data.age}</div>
    <div>${data.email}</div>`;

    this.#tableBody.appendChild(row);
  }

  /**
   * This method can be adapted to render data in different ways.
   * @param {FormData[]} items - The data to add.
   * @returns {void}
   */
  render(items) {
    items.forEach(item => this.addRow(item));
  }

}
