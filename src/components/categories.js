import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { switchCatAct, loadPageAct } from '../actions/dataActions';
import { CATS, PAGES } from '../util/utils';

class Categories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const currCat = this.props.dataState.category;

    return (
      <div className="categories">
        <ol>
          <li>
            <Link to="/main/movies" className={currCat === CATS.movie ? 'active' : ''} onClick={e => this.props.switchCatDispatch(CATS.movie)}>
              <FormattedMessage id='cats.movies' />
            </Link>
          </li>
          <li>
            <Link to="/main/tv" className={currCat === CATS.tv ? 'active' : ''} onClick={e => this.props.switchCatDispatch(CATS.tv)}>
              <FormattedMessage id='cats.tv' />
            </Link>
          </li>
          <li>
            <Link to="/main/documentaries" className={currCat === CATS.doc ? 'active' : ''} onClick={e => this.props.switchCatDispatch(CATS.doc)}>
              <FormattedMessage id='cats.docs' />
            </Link>
          </li>
          <li>
            <Link to="/main/animations" className={currCat === CATS.anime ? 'active' : ''} onClick={e => this.props.switchCatDispatch(CATS.anime)}>
              <FormattedMessage id='cats.anime' />
            </Link>
          </li>
        </ol>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  dataState: store.dataReducer
});

const mapDispatchToProps = (dispatch) => ({
  switchCatDispatch: (cat) => {
    dispatch(switchCatAct(cat));
    dispatch(loadPageAct(cat, PAGES.currPage, PAGES.startAt, PAGES.endAt));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);