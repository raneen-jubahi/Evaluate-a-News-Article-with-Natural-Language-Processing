const validURL =require ('valid-url');

const isvalidURL  =(url) => Boolean(validURL.isWebUri(`${url}`));



const validateURL  = (url) =>{
  return isvalidURL (url) ;
}
export {validateURL }