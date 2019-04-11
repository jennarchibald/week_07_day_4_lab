const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Munros = function () {
  this.data = null;
};

Munros.prototype.getData = function () {
  const helper = new RequestHelper('https://munroapi.herokuapp.com/munros');

  helper.get()
    .then( (munroData) => {
      this.data = munroData;
      PubSub.publish('Munro:munro-data-ready', munroData);
    });

};

module.exports = Munros;
