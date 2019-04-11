const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Munros = function () {
  this.data = null;
  this.regions = null;
};

Munros.prototype.getData = function () {
  const helper = new RequestHelper('https://munroapi.herokuapp.com/munros');

  helper.get()
    .then( (munroData) => {
      this.data = munroData;
      const regions = this.getRegions();
      this.regions = regions;
      PubSub.publish('Munro:munro-data-ready', this.data);
      PubSub.publish('Munro:regions-data-ready', regions);
    });

};

Munros.prototype.bindEvents = function () {

  PubSub.subscribe('SelectView:region-selection-made', (evt) => {
    const munros = this.getMunrosInRegion(evt.detail);
    PubSub.publish('Munro:regional-munro-data-ready', munros);
  });

};

Munros.prototype.getMunrosInRegion = function (index) {
  // find the name of the region from the index
  const region = this.regions[index];
  // filter the munros to find munros in that region
  const munrosInRegion = this.data.filter( (munro) => {
    return munro.region === region;
  });

  return munrosInRegion;
};

Munros.prototype.getRegions = function () {
  const regions = this.data
  .map((munro)=>{
    return munro.region;
  })
  .filter((region, index, regions)=>{
    return index === regions.indexOf(region);
  })
  return regions;
};


module.exports = Munros;
