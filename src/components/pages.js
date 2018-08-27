import * as React from 'react';
import { connect } from 'react-redux';
import { loadPageAct } from '../actions/dataActions';
import Mousetrap from 'mousetrap';

class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    gotoPage(page) {
        let currPage, startAt, endAt;

        switch (page) {
            case 'FIRST':
                if (this.props.dataState.pages.currPage > 1) {
                    currPage = 1;
                    startAt = 0;
                    endAt = this.props.dataState.pages.ipp - 1;
                } else {
                    return
                }
                break;
            case 'LAST':
                if (this.props.dataState.pages.currPage < this.props.dataState.pages.pageCnt) {
                    currPage = this.props.dataState.pages.pageCnt;
                    startAt = this.props.dataState.pages.ipp * (this.props.dataState.pages.pageCnt - 1);
                    endAt = this.props.dataState.pages.itemCnt - 1;
                } else {
                    return
                }
                break;
            case 'PREV':
                if (this.props.dataState.pages.currPage > 1) {
                    currPage = this.props.dataState.pages.currPage - 1;
                    startAt = this.props.dataState.pages.startAt - this.props.dataState.pages.ipp;
                    endAt = startAt + this.props.dataState.pages.ipp - 1;
                } else {
                    return
                }
                break;
            case 'NEXT':
                if (this.props.dataState.pages.currPage < this.props.dataState.pages.pageCnt) {
                    currPage = this.props.dataState.pages.currPage + 1;
                    startAt = this.props.dataState.pages.startAt + this.props.dataState.pages.ipp;
                    endAt = this.props.dataState.pages.endAt + this.props.dataState.pages.ipp;
                    if (endAt > (this.props.dataState.pages.itemCnt - 1)) {
                        endAt = this.props.dataState.pages.itemCnt - 1
                    }
                } else {
                    return
                }
                break;
            default: break;
        }

        this.props.loadPageDispatch(this.props.dataState.category, currPage, startAt, endAt);
    }

    currPage = () => {
        return this.props.dataState.pages.currPage
    }

    componentDidMount() {
        Mousetrap.bind('home', e => this.gotoPage('FIRST'));
        Mousetrap.bind('end', e => this.gotoPage('LAST'));
        Mousetrap.bind('left', e => this.gotoPage('PREV'));
        Mousetrap.bind('right', e => this.gotoPage('NEXT'));
    }

    componentWillUnmount() {
        Mousetrap.unbind('home', e => this.gotoPage('FIRST'));
        Mousetrap.unbind('end', e => this.gotoPage('LAST'));
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
                        <input type="text" className="page-no-input" placeholder={this.currPage()} onKeyUp={e => this.onKeyUp(e)} />
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
    loadPageDispatch: (category, currPage, startAt, endAt) => {
        dispatch(loadPageAct(category, currPage, startAt, endAt))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
