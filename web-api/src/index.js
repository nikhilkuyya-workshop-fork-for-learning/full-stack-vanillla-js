import http from 'node:http';
import { handlers } from './handlers.js';

http.createServer(handlers).listen(3000).on('listening',() => {
  console.log('listening on port 3000')
})
