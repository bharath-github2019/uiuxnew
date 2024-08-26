import React from "react";
import ReactDOM from "react-dom";

var randomNumber = Math.floor(Math.random() * 6 ) + 1;


ReactDOM.render(

  <h3>your application number is {randomNumber}</h3>,
  document.getElementById('root')
);
console.log(number);