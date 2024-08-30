import { DEFAULT_HEADERS } from "../util/util.js";
import { once }from 'node:events';

const routes = ({userFactory}) => ({
  '/users:get': async (request,response) => {
    const data = await userFactory.find();
    response.writeHead(200,DEFAULT_HEADERS);
    return response.end(JSON.stringify(data));
  },
  '/users:post': async (request,response) => {
    const dataBuffer = await once(request, 'data')
    const data = JSON.parse(dataBuffer)
    await userFactory.create(data);
    response.writeHead(201,DEFAULT_HEADERS);
    return response.end(JSON.stringify({message: 'successfully added user'}));
  }
})
export { routes };
