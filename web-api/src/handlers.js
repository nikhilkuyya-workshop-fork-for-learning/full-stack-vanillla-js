// import { parseURL } from 'whatwg-url';
import { parse , fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { routes } from './routes/userRoutes.js';
import { DEFAULT_HEADERS } from './util/util.js';
import { generateUserInsanctances } from './factory/userFactory.js';

const currentDir = dirname(fileURLToPath(import.meta.url));
const dbPath = join(currentDir, '..','database','data.db');
const userFactory = generateUserInsanctances({dbPath})
const userRoutes = routes({userFactory});

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
  return Promise.resolve(choosen(request,response)).catch(handleError(response));
};

function handleError(response) {
  return (error) => {
    console.log('something went wrong',error.stack);
    response.writeHead(500,DEFAULT_HEADERS);
    response.write(JSON.stringify({
      error: 'something went wrong'
    }));
    return response.end();
  }
}

export { handlers};
