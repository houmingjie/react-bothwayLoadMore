import React, {Component} from 'react';
import ReactDom from 'react-dom';


class Examples extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div></div>
    }
}

ReactDom.render(<Examples></Examples>, document.getElementById('examples'));