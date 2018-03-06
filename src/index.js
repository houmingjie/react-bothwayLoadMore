import 'babel-polyfill';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class BothwayDynamicLoader extends Component {
    static defaultProps = {
        triggerOffset: 100,
        hasEarlier: true,
        hasLatter: true,
    };

    static propTypes = {
        triggerOffset: PropTypes.number,          //偏差值
        loadEarlier: PropTypes.func.isRequired,   //向上加载历史
        hasEarlier: PropTypes.bool,               //是否还有历史可以继续加载
        loadLatter: PropTypes.func.isRequired,    //向下加载更多
        hasLatter: PropTypes.bool,                //是否还有更多可以继续加载
        wrapperRef: PropTypes.func,               //返回wrapper元素
    };

    constructor(props) {
        super(props);
        this.state = {
            earlierLoading: false,
            latterLoading: false,
        }
    };

    earlierLoading = false;
    loadEarlier = async () => {
        const {loadEarlier, hasEarlier} = this.props;
        if (hasEarlier && !this.earlierLoading) {
            this.earlierLoading = true;
            this.setState({
                earlierLoading: true
            });
            await loadEarlier();
            this.earlierLoading = false;
            this.setState({
                earlierLoading: false
            });
        }
    };

    latterLoading = false;
    loadLatter = async () => {
        const {loadLatter, hasLatter} = this.props;
        if (hasLatter && !this.latterLoading) {
            this.latterLoading = true;
            this.setState({
                latterLoading: true
            });
            await loadLatter();
            this.latterLoading = false;
            this.setState({
                latterLoading: false
            });
        }
    };

    // lastScrollTop = 0;

    onWheel = (e) => {
        const direction = e.deltaY;

        // if (this.silenceScroll) {
        // this.silenceScroll = false;
        // this.lastScrollTop = this._refs.wrapper.scrollTop;
        // return;
        // }

        let {wrapper, body} = this._refs;

        // const thisScrollTop = wrapper.scrollTop;
        // //方向，仅在滚动方向加载
        // const direction = thisScrollTop - this.lastScrollTop;
        // this.lastScrollTop = thisScrollTop;

        let {triggerOffset, hasLatter, hasEarlier} = this.props;
        if (!(hasEarlier || hasLatter)) {
            return;
        }

        if (direction >= 0) {//向下,加载更多
            if ((body.scrollHeight - wrapper.offsetHeight - wrapper.scrollTop) <= triggerOffset) {
                console.info(body.scrollHeight - wrapper.offsetHeight - wrapper.scrollTop)
                this.loadLatter();
            }
        } else {//向上，加载历史
            if (wrapper.scrollTop <= triggerOffset) {
                this.loadEarlier();
            }
        }
    };

    // silenceScroll = false;

    //通过该方法设置scrollTop不会触发加载操作
    // silenceSetScrollTop = (scrollTop) => {
    //     const {wrapper} = this._refs;
    //     if (wrapper) {
    //         this.silenceScroll = true;
    //         wrapper.scrollTop = scrollTop;
    //     }
    // };

    _refs = {};

    render() {
        let {wrapperClassName, bodyClassName, hasEarlier, hasLatter, children, wrapperRef} = this.props;
        const {earlierLoading, latterLoading} = this.state;
        wrapperClassName = `${wrapperClassName || ''}  bothway-loadmore-wrapper`;
        bodyClassName = `${bodyClassName || ''}  bothway-loadmore-body`;

        let loadEarlierTrigger = null;
        let loadLatterTrigger = null;
        if (hasEarlier) {
            if (earlierLoading) {
                loadEarlierTrigger =
                    <div className="bothway-loadmore-loading">
                        <spin className="loading-icon"></spin>
                        <spin className="loading-tip">
                            加载中
                        </spin>
                    </div>
            } else {
                loadEarlierTrigger =
                    <div className="bothway-loadmore-loading">
                        <a
                            onClick={this.loadEarlier}>
                            加载历史
                        </a>
                    </div>;
            }
        }

        if (hasLatter) {
            if (latterLoading) {
                loadLatterTrigger =
                    <div className="bothway-loadmore-loading">
                        <spin className="loading-icon"></spin>
                        <spin className="loading-tip">
                            加载中
                        </spin>
                    </div>
            } else {
                loadLatterTrigger =
                    <div className="bothway-loadmore-loading">
                        <a
                            onClick={this.loadLatter}>
                            加载更多
                        </a>
                    </div>;
            }
        }

        return (
            <div className={wrapperClassName}
                 ref={e => {
                     this._refs.wrapper = e;
                     wrapperRef && wrapperRef(e);
                 }}
                 onWheel={this.onWheel}>
                <div
                    className={bodyClassName}
                    ref={e => this._refs.body = e}
                >
                    {loadEarlierTrigger}
                    {children}
                    {loadLatterTrigger}
                </div>
            </div>
        );
    }
}
