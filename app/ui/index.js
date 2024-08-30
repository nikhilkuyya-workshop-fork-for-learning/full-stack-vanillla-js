#!/usr/bin/env node
import Controller from "../src/shared/controller.js";
import Service from "../src/shared/service.js";

const platform = globalThis.window ? "web": "console";

const {default: View } = await import(`./../src/platforms/${platform}/view.js`);
const { API_URL } = await import(`./../src/platforms/${platform}/constant.js`);

await Controller.init({
  view: new View(),
  service: new Service({url: API_URL })
})
