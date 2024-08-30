let API_URL;
if(window.location.origin === 'https://nikhilkuyya-workshop-fork-for-learning.github.io'){
  API_URL = 'https://full-stack-vanillla-js.onrender.com'
}else {
  API_URL = `http://localhost:3000`
}
export {API_URL};
