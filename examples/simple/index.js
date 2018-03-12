import React, {Component} from 'react';
import BothwayLoadMore from '../../src/index';
import '../../src/assets/index.scss';
import './index.scss';

function deffer(time = 1000) {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [0, 1, 2, 3],
            hasEarlier: true,
            hasLatter: true
        }
    }

    loadEarlier = async () => {
        await deffer();
        const earliestId = this.state.list[0];
        const {listWrapper} = this._refs;
        const orgScrollTop = listWrapper.scrollTop;
        const orgScrollHeight = listWrapper.scrollHeight;
        this.setState({
            list: [earliestId - 3, earliestId - 2, earliestId - 1, ...this.state.list]
        },() => {
            listWrapper.scrollTop = orgScrollTop + listWrapper.scrollHeight - orgScrollHeight;
        });
    };

    loadLatter = async () => {
        await deffer();
        const lattestId = this.state.list[this.state.list.length - 1];
        this.setState({
            list: [...this.state.list, lattestId + 1, lattestId + 2, lattestId + 3]
        });
    };

    _refs = {};

    render() {
        const {hasLatter, hasEarlier, list} = this.state;
        return (
            <div className='demo'>
                <h1 className="title">Simple</h1>
                <div className="list">
                    <BothwayLoadMore
                        hasLatter={hasLatter}
                        hasEarlier={hasEarlier}
                        loadEarlier={this.loadEarlier}
                        loadLatter={this.loadLatter}
                        triggerOffset={100}
                        wrapperRef={e => this._refs.listWrapper = e}
                    >
                        {list.map(item => {
                            item = item + "";
                            return (
                                <div
                                    key={item}
                                    className="item">
                                    {item}
                                </div>
                            )
                        })}
                    </BothwayLoadMore>
                </div>
            </div>
        )
    }
}

