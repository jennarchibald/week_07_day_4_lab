const Munros = require('./models/munros.js');
const MunroListView = require('./views/munro_list_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const listContainer = document.querySelector('#munro-list-view-wrapper');
  const munroListView = new MunroListView(listContainer);
  munroListView.bindEvents();

  const munros = new Munros();
  munros.getData();

});
