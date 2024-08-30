import http from 'node:http';
import { handlers } from './handlers.js';
const PORT = process.env.PORT || 3000;
http.createServer(handlers).listen(PORT).on('listening',() => {
  console.log(`listening on port ${PORT}`)
})
