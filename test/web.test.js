import { describe, it } from 'node:test';
import Controller from './../src/shared/controller.js';
import WebView from './../src/platforms/web/view.js';
import assert from 'node:assert';

function setglobalDocument(mock, mockData) {
  globalThis.alert = mock.fn();

  globalThis.document = {
    createElement: mock.fn(() => {
      return {
        classList: {
          add: mock.fn((newClass) => {}),
        }
      }
    }),
    querySelector: mock.fn((selector) => {
      const mockValue = mockData[selector.replace('#','')] || '';
      return {
        value: mockValue,
        reset: mock.fn(),
        appendChild: mock.fn((element) => {}),
        addEventListener: mock.fn((event,fn) => {})
      }
    }),
  };
}

describe('web app test suite ', () => {

  it('submit with proper should add to table', (context) => {
    const mock = context.mock;
    setglobalDocument(mock,{name: 'test', age: 2, email: 'email@mail.com'});
    const view = new WebView();
    const addRow = mock.method(view, view.addRow.name);
    const resetForm = mock.method(view,view.resetForm.name);

    Controller.init({
      view: view
    })

    const [
      name,
      age,
      email,
      table,
      form,
      btnClear
    ] = document.querySelector.mock.calls;

    assert.strictEqual(name.arguments[0],'#name');
    assert.strictEqual(age.arguments[0],'#age');
    assert.strictEqual(email.arguments[0],'#email');
    assert.strictEqual(table.arguments[0],'.flex-table');
    assert.strictEqual(form.arguments[0],'#form');
    assert.strictEqual(btnClear.arguments[0],'#btnFormClear');

    assert.strictEqual(addRow.mock.callCount(),3);

    const submitCallBack = form.result.addEventListener.mock.calls[0].arguments[1];
    const preventDefaultSpy = mock.fn();
    submitCallBack({
      preventDefault: preventDefaultSpy
    });

    assert.strictEqual(addRow.mock.callCount(),4);
    assert.deepStrictEqual(addRow.mock.calls.at(3).arguments[0],
    {name: 'test', age : 2, email: 'email@mail.com'});

    assert.strictEqual(resetForm.mock.callCount(),1);
  })

  it('should call notify when submitted with no proper value', (context) => {
      const mock = context.mock;
      setglobalDocument(mock,{name: '', age: 2, email: 'email@mail.com'});
      const view = new WebView();
      const addRow = mock.method(view, view.addRow.name);
      const resetForm = mock.method(view,view.resetForm.name);
      const notify = mock.method(view,view.notify.name);

      Controller.init({
        view: view
      })

      const [
        name,
        age,
        email,
        table,
        form,
        btnClear
      ] = document.querySelector.mock.calls;

      const submitCallBack = form.result.addEventListener.mock.calls[0].arguments[1];
      const preventDefaultSpy = mock.fn();
      assert.strictEqual(addRow.mock.callCount(),3);
      submitCallBack({
        preventDefault: preventDefaultSpy
      });
      assert.strictEqual(addRow.mock.callCount(),3);
      assert.strictEqual(resetForm.mock.callCount(),0);
      assert.strictEqual(notify.mock.callCount(),1);
    });
})
