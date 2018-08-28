import * as React from 'react';
import { connect } from 'react-redux';
import { loadPageAct } from '../actions/dataActions';
import { PAGES } from '../util/utils';
import Mousetrap from 'mousetrap';

class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.numRef = React.createRef();
    }

    gotoPage(page) {
        let currPage = PAGES.currPage, startAt = PAGES.startAt, endAt = PAGES.endAt;
        let data_currPage = this.props.dataState.pages.currPage,
            data_pageCnt = this.props.dataState.pages.pageCnt,
            data_startAt = this.props.dataState.pages.startAt,
            data_endAt = this.props.dataState.pages.endAt,
            data_itemCnt = this.props.dataState.pages.itemCnt,
            data_ipp = this.props.dataState.pages.ipp;

        switch (page) {
            case 'FIRST':
                if (data_currPage > 1) {
                    currPage = 1;
                    startAt = 0;
                    endAt = data_ipp - 1;
                }
                break;
            case 'LAST':
                if (data_currPage < data_pageCnt) {
                    currPage = data_pageCnt;
                    startAt = data_ipp * (data_pageCnt - 1);
                    endAt = data_itemCnt - 1;
                }
                break;
            case 'PREV':
                if (data_currPage > 1) {
                    currPage = data_currPage - 1;
                    startAt = data_startAt - data_ipp;
                    endAt = startAt + data_ipp - 1;
                }
                break;
            case 'NEXT':
                if (data_currPage < data_pageCnt) {
                    currPage = data_currPage + 1;
                    startAt = data_startAt + data_ipp;
                    endAt = data_endAt + data_ipp;
                    if (endAt > (data_itemCnt - 1)) {
                        endAt = data_itemCnt - 1
                    }
                }
                break;
            default: // Go to specific page
                if (page <= data_pageCnt && page >= 1) {
                    currPage = page;
                    startAt = data_ipp * page - 1;
                    endAt = startAt + data_ipp - 1;
                }
                break;
        }

        this.props.loadPageDispatch(this.props.dataState.category, currPage, startAt, endAt);
    }

    setPageNum(e) {
        if(e.which === 13) {
            this.gotoPage(Number(e.target.value));
            this.numRef.current.value = '';
            this.numRef.current.blur();
        }
    }

    componentDidMount() {
        Mousetrap.bind('ctrl+left', e => this.gotoPage('FIRST'));
        Mousetrap.bind('ctrl+right', e => this.gotoPage('LAST'));
        Mousetrap.bind('left', e => this.gotoPage('PREV'));
        Mousetrap.bind('right', e => this.gotoPage('NEXT'));
    }

    componentWillUnmount() {
        Mousetrap.unbind('ctrl+left', e => this.gotoPage('FIRST'));
        Mousetrap.unbind('ctrl+right', e => this.gotoPage('LAST'));
        Mousetrap.unbind('left', e => this.gotoPage('PREV'));
        Mousetrap.unbind('right', e => this.gotoPage('NEXT'));
    }

    render() {
        return (
            <div id="pages">
                <div id="controls">
                    <button className="first" onClick={e => this.gotoPage('FIRST')}>❬❬</button>
                    <button onClick={e => this.gotoPage('PREV')}>❬</button>
                    <div className="page-no">
                        <input type="text" ref={this.numRef} className="page-num-input" placeholder={this.props.dataState.pages.currPage} onKeyUp={e => this.setPageNum(e)} />
                        <span className="page-cnt">/&nbsp;{this.props.dataState.pages.pageCnt}</span>
                    </div>
                    <button onClick={e => this.gotoPage('NEXT')}>❭</button>
                    <button className="last" onClick={e => this.gotoPage('LAST')}>❭❭</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    dataState: store.dataReducer
});

const mapDispatchToProps = (dispatch) => ({
    loadPageDispatch: (category, currPage, startAt, endAt) => dispatch(loadPageAct(category, currPage, startAt, endAt))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
