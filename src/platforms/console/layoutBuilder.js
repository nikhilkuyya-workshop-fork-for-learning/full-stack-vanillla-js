import blessed from 'blessed';
import contrib from 'blessed-contrib';

export default class LayoutBuilder {
  #screen;
  #layout;
  #form;
  #inputs = {};

  setScreen({title}){
    this.#screen = blessed.screen({
      smartCSR: true,
      title
    });
    this.#screen.key(['q'],() => process.exit(0))
    return this;
  }

  setLayout(){
    this.#layout = blessed.layout({
      parent: this.#screen,
      width: '100%',
      height: '100%'
    });
    return this;
  }


  #createInputField({ parent, name, top, label }) {
    const input = blessed.textbox({
        parent,
        name,
        top,
        label,
        inputOnFocus: true,
        left: 'center',
        width: '60%',
        height: '25%',
        border: { type: 'line' },
        style: {
            fg: 'white',
            bg: 'green',
            focus: { bg: 'cyan' }
        }
    })
    return input
  }


  setForm({onSubmit,onClear}){
    const form = blessed.form({
      parent: this.#layout,
      width: '100%',
      height: '40%',
      top: 0,
      left: 'center',
      keys: true,
      vi: false,
      label: 'User From',
      border: {type: 'line'},
      style: {
        'fg': 'white',
        'bg': 'black'
      }
    })

    const nameInput = this.#createInputField({parent: form, name: 'name', top: 1, label: 'Name:'});
    const ageInput = this.#createInputField({parent: form, name: 'age', top: 4, label: 'Age:'})
    const emailInput = this.#createInputField({parent: form, name: 'email', top: 7, label: 'Email:'})
    nameInput.focus();
    this.#inputs.name = nameInput;
    this.#inputs.age = ageInput;
    this.#inputs.email = emailInput;

    this.#form =form;
    return this;
  }

  build() {
    const components = {
      screen: this.#screen,
      layout: this.#layout,
      form: this.#form,
      inputs: this.#inputs
    }
    components.screen.render();
    return components;
  }
}
