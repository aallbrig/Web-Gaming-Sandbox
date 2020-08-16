import 'bootstrap/dist/css/bootstrap.css';
import _ from 'lodash';

function component() {
  const element = document.createElement('div');
  element.innerHTML = _.join(['Web', 'Gaming', 'Sandbox', 'Baby'], ' ');
  return element;
}

document.body.appendChild(component());
