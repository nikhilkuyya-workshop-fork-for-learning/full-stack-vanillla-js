import { DEFAULT_HEADERS } from "../util/util.js";

const routes = ({}) => ({
  '/users:get': (request,response) => {
    response.writeHead(200,DEFAULT_HEADERS);
    return response.end('get');
  },
  '/users:post': (request,response) => {
    response.writeHead(201,DEFAULT_HEADERS);
    return response.end();
  }
})
export {routes};
