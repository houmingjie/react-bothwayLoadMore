import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './index.scss';
import Simple from './simple';
import 'babel-polyfill';

class Examples extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Simple></Simple>
        )
    }
}

ReactDom.render(<Examples></Examples>, document.getElementById('examples'));