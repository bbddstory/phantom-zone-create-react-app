import * as React from 'react';
import { connect } from 'react-redux';
import { syncCatAct, loadPageAct } from '../actions/dataActions';
import Loadable from 'react-loadable';
import { loadComp } from '../util/utils';

// Code splitting
const CardList = Loadable({
  loader: () => import('./cardList'),
  loading: loadComp,
});

class SearchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  loadPage() {
    if (this.props.dataState.category !== this.props.dataState.prevCat) {
      this.props.syncCat();
      this.props.loadPageDispatch(
        this.props.dataState.pages.category,
        this.props.dataState.pages.currPage,
        this.props.dataState.pages.startAt,
        this.props.dataState.pages.endAt
      )
    }
  }

  componentDidMount() {
    this.loadPage();
  }
  
  componentDidUpdate() {
    this.loadPage();
  }

  render() {
    return (
      <CardList dataRef={this.props.dataState.search} usePages={false} />
    )
  }
}

const mapStateToProps = (store) => ({
  dataState: store.dataReducer
});

const mapDispatchToProps = (dispatch) => ({
  syncCat: () => dispatch(syncCatAct()),
  loadPageDispatch: (category, currPage, startAt, endAt) => dispatch(loadPageAct(category, currPage, startAt, endAt))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
