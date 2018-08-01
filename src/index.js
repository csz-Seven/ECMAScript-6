import _ from 'lodash';
import './style/style.css'
import icon from './webpack.png'

function component() {
    var element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    // 使用css-lodash

    // 使用file-lodash
    var myIcon = new Image();
    myIcon.src = icon;
    element.appendChild(myIcon)
    element.classList.add('hello')
    return element;
}

document.body.appendChild(component());
