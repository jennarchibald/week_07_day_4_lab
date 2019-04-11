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
    })
    .catch( (err)=>{
      PubSub.publish('Munro:error', err );
    });

};

Munros.prototype.bindEvents = function () {

  PubSub.subscribe('SelectView:region-selection-made', (evt) => {
    const munros = this.getMunrosInRegion(evt.detail);
    const munrosWithWeather = this.getWeather(munros);
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

Munros.prototype.getWeather = function (munros) {

  const allRequests = munros.map( (munro) => {

    const helper = new RequestHelper(`http://api.openweathermap.org/data/2.5/weather?lat=${munro.latlng_lat}&lon=${munro.latlng_lng}&APPID=0c15a71fb3f9c7e86d4f468ade343708`);

     return helper.get()
      .then( (weather) => {
        munro["weather"] = weather.weather[0].description;
        munro["temperature"] = weather.main.temp -273.15;
        return munro;
      })
      .catch( (err)=>{
        PubSub.publish('Munro:error', err );
      });

  });
  // console.log(allRequests);

  Promise.all(allRequests).then((values) =>{
    // console.log(values);
    PubSub.publish('Munro:regional-munro-data-ready', values)
  });
};


module.exports = Munros;
