import _ from 'lodash';

function component() {
  const element = document.createElement('div');
  element.innerHTML = _.join(['Web', 'Gaming', 'Sandbox', 'Babee'], ' ');
  return element;
}

document.body.appendChild(component());
