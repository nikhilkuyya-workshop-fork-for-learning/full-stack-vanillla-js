import blessed from 'blessed';
import contrib from 'blessed-contrib';

export default class LayoutBuilder {
  #screen;
  #layout;
  #form;
  #inputs = {};
  #buttons = {};
  #alert;

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

  #createButton({parent, name, content, left, bottom, bg, fg }){
    return blessed.button({
      parent,
      name,
      content,
      left,
      bottom,
      style: {
        bg, fg,
        focus: { bg : `ligth${bg}`},
        hover: { bg: `light${bg}` }
      },
      mouse: true,
      keys: true,
      shrink: true,
      width: 'shrink',
      padding: { left: 1, right: 1 }
    })
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

    const submitButton = this.#createButton({ parent: form, name: 'submit', content: 'Submit', left: '35%', bottom: 1 , bg : 'green', fg: 'black'})
    const clearButton = this.#createButton({ parent: form, name: 'clear', content: 'Clear', left: '55%', bottom: 1 , bg : 'red', fg: 'white'})
    this.#buttons.submit = submitButton;
    this.#buttons.clear = clearButton;



    submitButton.on('press', () => form.submit())
    form.on('submit', (data) => onSubmit(data))

    clearButton.on('press', () => onClear())
    this.#form =form;
    return this;
  }

  setAlertComponent() {
    this.#alert = blessed.box({
      parent: this.#form,
      width: '40%',
      height: '25%',
      top: 0,
      border: {
        type: 'line'
      },
      style: {
        bg: 'red',
        fg: 'white'
      },
      content: '',
      hidden: true,
      align: 'center',
      tags: true
    })

    this.#alert.setMessage = (msg) => {
      this.#alert.setContent(`{bold}${msg}{/bold}`);
      this.#alert.show();
      this.#screen.render();
      setTimeout(() => {
        this.#alert.hide();
        this.#screen.render();
      },3000);
    }
    return this;
  }

  build() {
    const components = {
      screen: this.#screen,
      layout: this.#layout,
      form: this.#form,
      inputs: this.#inputs,
      buttons: this.#buttons,
      alert: this.#alert
    }
    components.screen.render();
    return components;
  }
}
