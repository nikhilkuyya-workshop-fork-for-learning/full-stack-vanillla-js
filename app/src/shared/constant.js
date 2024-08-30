let API_URL;
if(process.env.ENV === 'prod'){
  API_URL = 'https://full-stack-vanillla-js.onrender.com/'
}else {
  API_URL = `http://localhost:3000`
}
export {API_URL};
