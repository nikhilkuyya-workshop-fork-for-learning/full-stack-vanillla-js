let API_URL;

if( process.env.NODE_ENV === 'prod' ) {
  API_URL = 'https://full-stack-vanillla-js.onrender.com'
}else {
  API_URL = `http://localhost:5001`
}
export {API_URL};
