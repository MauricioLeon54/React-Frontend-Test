
/**
 * 
 * @param {String} url 
 * @param {Function} response 
 * @param {Function} error 
 */
const Get = (url, response, error) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => response(data))
    .catch(e => error(e))
}

export {
  Get
}
