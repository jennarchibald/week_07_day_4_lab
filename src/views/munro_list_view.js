const PubSub = require('../helpers/pub_sub.js');
const MunroView = require('./munro_view.js');

const MunroListView = function (container) {
  this.container = container;
};

MunroListView.prototype.bindEvents = function () {
  PubSub.subscribe('Munro:munro-data-ready', (evt) => {
    this.render(evt.detail);
  });
  PubSub.subscribe('Munro:regional-munro-data-ready', (evt) => {
    this.render(evt.detail);
  });
};

MunroListView.prototype.render = function (data) {
  this.container.innerHTML = '';
  data.forEach((munro)=>{
    const munroView = new MunroView(this.container, munro);
    munroView.render();
  });
};

module.exports = MunroListView;
