# BothwayLoadMore

## 何时使用

向上滚动，加载历史 || 向下滚动，加载更多。

## 使用条件

包裹组件的父级元素需指定高度以使该组件能够响应 height:100%

## Features

* 仅响应滚动方向上的加载

## API
```jsx harmony
    <DynamicLoader
        wrapperRef={e => this._refs.loaderWrap = e}
        ref={e => this._refs.loader = e}
        hasLatter={this.state.hasLatter}   //返回promise
        hasEarlier={this.state.hasEarlier} //返回promise
        loadLatter={this.loadLatter}
        loadEarlier={this.loadEarlier}
    >
        {content}
    </DynamicLoader>

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
    
    componentInstance.silenceSetScrollTop //通过该方法设置内容scrollTop不会触发加载操作
```

## 注：
* 如需仅支持单向滚动加载，可以设置hasLatter或hasEarlier为false
* 向上加载更多导致children变更，默认会滚动至顶部，保持滚动位置不变需要自行实现。
这主要是考虑到数据通过非setState方式更新（e.g. Redux），dom何时获得更新仅能在componentDidUpdate中得知，在该组件中并不能很好的判断。

## todo

滚动到两端注册onWheel事件，使之在滚动到两端的情形依然可以加载。
