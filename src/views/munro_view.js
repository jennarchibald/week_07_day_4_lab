const MunroView = function(container, munro) {
  this.container = container;
  this.munro = munro;
};

MunroView.prototype.render = function () {
  const munroContainer = document.createElement('div');
  munroContainer.classList.add('munro-container');
  this.container.appendChild(munroContainer);

  const munroHeading = this.createHeading();
  munroContainer.appendChild(munroHeading);

  const munroParagraph = this.createParagraph();
  munroContainer.appendChild(munroParagraph);

};

MunroView.prototype.createHeading = function () {
  const heading = document.createElement('h2');
  heading.textContent = this.munro.name;
  return heading;
};

MunroView.prototype.createParagraph = function () {
  const paragraph = document.createElement('p');
  paragraph.textContent = `${this.munro.name} is ${this.munro.height} metres at it's peak. The meaning of it's name is: "${this.munro.meaning}".`;
  return paragraph;
};
module.exports = MunroView;
