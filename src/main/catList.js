import * as React from 'react';
import { connect } from 'react-redux';
import { switchCatAct, syncCatAct, loadPageAct } from '../actions/dataActions';
import CardList from './cardList';
import TileList from './tileList';
import { CATS } from '../util/utils';

class CatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dummyPoster: 'images/posters/' + this.props.dataState.category + '.png' };
  }
  
  loadPage() {
    let hash = window.location.hash;
    let idx = hash.lastIndexOf('/');
    let cat = hash.substr(idx + 1, hash.length - idx);
    
    if (this.props.dataState.category === CATS.home || this.props.dataState.category !== this.props.dataState.prevCat) {
      this.props.switchCatDispatch(cat);
      this.props.syncCat();
      this.props.loadPageDispatch(
        cat,
        this.props.dataState.pages.currPage,
        this.props.dataState.pages.startAt,
        this.props.dataState.pages.endAt
      )
    }
  }

  componentDidMount() {
    this.loadPage();
  }
  
  render() {
    return (
      this.props.uiState.view === 'card' ? 
      <CardList dataRef={this.props.dataState.buffer} usePages={true} /> : <TileList dataRef={this.props.dataState.buffer} usePages={true} />
    )
  }
}

const mapStateToProps = (store) => ({
  uiState: store.uiReducer,
  dataState: store.dataReducer
});

const mapDispatchToProps = (dispatch) => ({
  syncCat: () => dispatch(syncCatAct()),
  loadPageDispatch: (category, currPage, startAt, endAt) => dispatch(loadPageAct(category, currPage, startAt, endAt)),
  switchCatDispatch: (cat) => dispatch(switchCatAct(cat))
});

export default connect(mapStateToProps, mapDispatchToProps)(CatList);
