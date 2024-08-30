#!/usr/bin/env node
import { API_URL } from "../src/shared/constant.js";
import Controller from "../src/shared/controller.js";
import Service from "../src/shared/service.js";

const platform = globalThis.window ? "web": "console";

const {default: View } = await import(`./../src/platforms/${platform}/view.js`);

await Controller.init({
  view: new View(),
  service: new Service({url: API_URL })
})
