import { describe, it, mock } from 'node:test';
import Controller from './../src/shared/controller.js';
import WebView from './../src/platforms/web/view.js';
import assert from 'node:assert';

function setglobalDocument(mock, mockData) {

  globalThis.document = {
    createElement: mock.fn(() => {
      return {
        classList: {
          add: mock.fn((newClass) => {}),
          remove: mock.fn(() => {})
        }
      }
    }),
    querySelector: mock.fn((selector) => {
      const mockValue = mockData[selector.replace('#','')] || '';
      return {
        classList: {
          add: mock.fn((newClass) => {}),
          remove: mock.fn(() => {})
        },
        value: mockValue,
        reset: mock.fn(),
        appendChild: mock.fn((element) => {}),
        addEventListener: mock.fn((event,fn) => {})
      }
    }),
  };
}
const serviceMock = {
  getUsers: mock.fn(() => []),
  createUser: mock.fn(() => ({}))
}
describe('web app test suite ', () => {

  it('submit with valid form, shoulld call create', async (context) => {
    const mock = context.mock;
    setglobalDocument(mock,{name: 'test', age: 2, email: 'email@mail.com'});
    const view = new WebView();
    const addRow = mock.method(view, view.addRow.name);
    const resetForm = mock.method(view,view.resetForm.name);

    await Controller.init({
      view: view,
      service: serviceMock
    })

    const [
      name,
      age,
      email,
      table,
      form,
      btnClear,
      notifyDiv
    ] = document.querySelector.mock.calls;

    assert.strictEqual(name.arguments[0],'#name');
    assert.strictEqual(age.arguments[0],'#age');
    assert.strictEqual(email.arguments[0],'#email');
    assert.strictEqual(table.arguments[0],'.flex-table');
    assert.strictEqual(form.arguments[0],'#form');
    assert.strictEqual(btnClear.arguments[0],'#btnFormClear');
    assert.strictEqual(notifyDiv.arguments[0],'#notifyDiv');

    assert.strictEqual(serviceMock.getUsers.mock.callCount(),1);

    const submitCallBack = form.result.addEventListener.mock.calls[0].arguments[1];
    const preventDefaultSpy = mock.fn();
    await submitCallBack({
      preventDefault: preventDefaultSpy
    });
    assert.strictEqual(serviceMock.createUser.mock.callCount(),1);
    assert.strictEqual(resetForm.mock.callCount(),1);
  })

  it('should call notify when submitted with no proper value', async (context) => {
      const mock = context.mock;
      setglobalDocument(mock,{name: '', age: 2, email: 'email@mail.com'});
      const view = new WebView();
      const addRow = mock.method(view, view.addRow.name);
      const resetForm = mock.method(view,view.resetForm.name);
      const notify = mock.method(view,view.notify.name);

      await Controller.init({
        view: view,
        service: serviceMock
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
      await submitCallBack({
        preventDefault: preventDefaultSpy
      });
      assert.strictEqual(resetForm.mock.callCount(),0);
      assert.strictEqual(notify.mock.callCount(),1);
    });
})
