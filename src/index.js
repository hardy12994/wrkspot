import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import CountriesComponent from "./containers/countries.container";
import { createStore, compose, applyMiddleware } from 'redux';
import appReducer from "./reducers";

const store = createStore(appReducer, 
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

axios.defaults.headers['Content-Type'] = 'application/json';

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <CountriesComponent />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));














// require("dotenv").config();


// const popupCenter = ({url, title, w, h}) => {
//   // Fixes dual-screen position                             Most browsers      Firefox
//   const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
//   const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

//   const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
//   const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

//   const systemZoom = width / window.screen.availWidth;
//   const left = (width - w) / 2 / systemZoom + dualScreenLeft
//   const top = (height - h) / 2 / systemZoom + dualScreenTop
//   const newWindow = window.open(url, title, 
//     `
//     scrollbars=yes,
//     width=${w / systemZoom}, 
//     height=${h / systemZoom}, 
//     top=${top}, 
//     left=${left}
//     `
//   )

//   if (window.focus) newWindow.focus();
// }

// const connect = (orgToken, clientSecret) => {
//   if (!orgToken) throw 'orgToken is required';
//   else if (!clientSecret) throw 'clientSecret is required';
//   else {

//     // hit the API with details (org token & client secret)
//     // if response is correct then open the window view
//     // get the user access token
//     // return to web client
//     // 

//     openURL = process.env.APP_URL + `integrate/user`;
//     popupCenter({ url: openURL, title: 'XpRate Connect', w: 900, h: 500 });
//     // hit the API with details
//     // if details are correct then 

//     // get response (user access token)
//     // return the response
//   }
// };

// export default connect;