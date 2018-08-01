import _ from 'lodash';
import printMe from './print.js'

function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');


    console.log('webpack watch')
    console.log('webpack dev server')

    return element;
}

document.body.appendChild(component());
