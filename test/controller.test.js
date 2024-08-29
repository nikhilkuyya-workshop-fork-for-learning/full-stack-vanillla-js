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
  return new View();
}

describe('controller',() => {
  it('controller calls of setup',() => {
    const view = getView();
    Controller.init({
      view
    })
    assert.strictEqual(view.configureFormSubmit.mock.callCount(),1);
    assert.strictEqual(view.configureFormClear.mock.callCount(),1);
    assert.strictEqual(view.render.mock.callCount(),1);
  })

  it('viewBase',() => {
    const view = new ViewBase();
    const configureFormClearSpy = mock.method(view,view.configureFormClear.name);
    try {
      Controller.init({
        view
      })
    }catch(e) {
      assert.strictEqual(configureFormClearSpy.mock.callCount(),1);
    }
  })
})
