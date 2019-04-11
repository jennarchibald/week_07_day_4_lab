const PubSub = require('../helpers/pub_sub.js');

const ErrorView = function (container){
  this.container = container;
};

ErrorView.prototype.bindEvents = function () {
  PubSub.subscribe('Munro:error', ()=>{
    this.render();
  });
};

ErrorView.prototype.render = function () {
  const errorMessage = document.createElement('p');
  errorMessage.textContent = 'Oops! Something went sideways! :('
  this.container.appendChild(errorMessage);
};

module.exports = ErrorView;
