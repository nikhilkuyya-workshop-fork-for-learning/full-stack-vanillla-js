import { describe, it , mock  }  from 'node:test';
import assert from 'node:assert';
import ViewBase from '../src/shared/viewBase.js';
import Controller from '../src/shared/controller.js';

function getView() {
  class View extends ViewBase {
    render = mock.fn();
    resetForm = mock.fn();
    addRow = mock.fn();
    configureFormClear = mock.fn();
    configureFormSubmit = mock.fn();
    notify = mock.fn();
  }
  const service = {
    getUsers: mock.fn(() => []),
    createUser: mock.fn(() => ({}))
  }
  return {view: new View(),service}
}

describe('controller',() => {
  it('controller calls of setup', async () => {
    const {view,service} = getView();
    await Controller.init({
      view,
      service
    })
    assert.strictEqual(view.configureFormSubmit.mock.callCount(),1);
    assert.strictEqual(view.configureFormClear.mock.callCount(),1);
    assert.strictEqual(view.render.mock.callCount(),1);
  })

  it('viewBase',async () => {
    const view = new ViewBase();
    const {service} = getView();
    const configureFormClearSpy = mock.method(view,view.configureFormClear.name);
    try {
      await Controller.init({
        view,service
      })
    }catch(e) {
      assert.strictEqual(configureFormClearSpy.mock.callCount(),1);
    }
  })
})
