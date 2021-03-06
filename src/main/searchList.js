import * as React from 'react';
import { connect } from 'react-redux';
import { syncCatAct, loadDataAct } from '../actions/dataActions';
import CardList from './cardList';

class SearchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dummyPoster: 'images/posters/' + this.props.dataState.category + '.png' };
  }
  
  loadData() {
    if (this.props.dataState.category !== this.props.dataState.prevCat) {
      this.props.syncCat();
      this.props.loadDataDispatch(
        this.props.dataState.category,
        this.props.dataState.currPage,
        this.props.dataState.startAt,
        this.props.dataState.endAt
      )
    }
  }

  componentDidMount() {
    this.loadData();
  }
  
  componentDidUpdate() {
    this.loadData();
  }

  render() {
    return (
      <CardList dataRef={this.props.dataState.search} showPages={false} category=""/>
    )
  }
}

const mapStateToProps = (store) => ({
  dataState: store.dataReducer
});

const mapDispatchToProps = (dispatch) => ({
  syncCat: () => {
    dispatch(syncCatAct())
  },
  loadDataDispatch: (category, currPage, startAt, endAt) => {
    dispatch(loadDataAct(category, currPage, startAt, endAt))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
