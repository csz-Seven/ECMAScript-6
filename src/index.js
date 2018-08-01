import _ from 'lodash';
import printMe from './print.js'

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'BUTTON'
    btn.onclick = printMe;
    return element;
}

document.body.appendChild(component());