import * as React from 'react';
import { connect } from 'react-redux';
import { loadDataAct } from '../actions/dataActions';

class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    gotoPage(page) {
        let currPage, startAt, endAt;

        switch (page) {
            case 'FIRST':
                if (this.props.dataState.currPage > 1) {
                    currPage = 1;
                    startAt = 0;
                    endAt = this.props.dataState.ipp - 1;
                } else {
                    return
                }
                break;
            case 'LAST':
                if (this.props.dataState.currPage < this.props.dataState.pageCnt) {
                    currPage = this.props.dataState.pageCnt;
                    startAt = this.props.dataState.ipp * (this.props.dataState.pageCnt - 1);
                    endAt = this.props.dataState.itemCnt - 1;
                } else {
                    return
                }
                break;
            case 'PREV':
                if (this.props.dataState.currPage > 1) {
                    currPage = this.props.dataState.currPage - 1;
                    startAt = this.props.dataState.startAt - this.props.dataState.ipp;
                    endAt = startAt + this.props.dataState.ipp - 1;
                } else {
                    return
                }
                break;
            case 'NEXT':
                if (this.props.dataState.currPage < this.props.dataState.pageCnt) {
                    currPage = this.props.dataState.currPage + 1;
                    startAt = this.props.dataState.startAt + this.props.dataState.ipp;
                    endAt = this.props.dataState.endAt + this.props.dataState.ipp;
                    if (endAt > (this.props.dataState.itemCnt - 1)) {
                        endAt = this.props.dataState.itemCnt - 1
                    }
                } else {
                    return
                }
                break;
            default: break;
        }

        this.props.loadDataDispatch(this.props.dataState.category, currPage, startAt, endAt);
    }

    currPage = () => {
        return this.props.dataState.currPage
    }

    onKeyUp(e) {
        console.log(e.target.value);
    }

    turnPages = (e) => {
        if (e.ctrlKey && e.which === 37) {
            this.gotoPage('PREV');
        }
        if (e.ctrlKey && e.which === 39) {
            this.gotoPage('NEXT');
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.turnPages, true);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.turnPages, true);
    }

    render() {
        return (
            <div id="pages">
                <div id="controls">
                    <button className="first" onClick={e => this.gotoPage('FIRST')}>❬❬</button>
                    <button onClick={e => this.gotoPage('PREV')}>❬</button>
                    <div className="page-no">
                        <input type="text" className="page-no-input" placeholder={this.currPage()} onKeyUp={e => this.onKeyUp(e)} /><span className="page-cnt">/&nbsp;{this.props.dataState.pageCnt}</span>
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
    loadDataDispatch: (category, currPage, startAt, endAt) => {
        dispatch(loadDataAct(category, currPage, startAt, endAt))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
