import { BASE_URL, Route, Error } from './constants.js';


const loadData = (route, errorMessage, method = 'GET', body = null) =>
  fetch(`${BASE_URL}${route}`,{method, body})
    .then((response) => {
      if (response.ok){
        return response.json();
      }
      throw new Error();
    })
    .catch(() => {
      throw new Error(errorMessage);
    });

export const getData = () => loadData(Route.GET_DATA, Error.GET_DATA);
export const sendData = (body) => loadData(Route.SEND_DATA, Error.SEND_DATA, 'POST', body);
