// import { parseURL } from 'whatwg-url';
import { parse } from 'node:url';
import { routes } from './routes/userRoutes.js';
import { DEFAULT_HEADERS } from './util/util.js';

const userRoutes = routes({});

const allRoutes = {
  ...userRoutes,
  deafultRoute: (request,response) => {
    response.writeHead(404,DEFAULT_HEADERS);
    return response.end();
  }
}

function handlers(request, response) {
  const { url, method } = request;
  const { pathname } = parse(url);
  // const pathname = path && Array.isArray(path) ? path.join('/') : path;
  const key = `${pathname}:${method.toLocaleLowerCase()}`;
  const choosen = allRoutes[key] ?? allRoutes.deafultRoute ;
  return Promise.resolve(choosen(request,response)).catch(err => {
    console.error('error',err);
  });
};

export { handlers};
