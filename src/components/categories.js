import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { switchCatAct } from '../actions/categoriesActions';
import { CATS } from '../util/utils';

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
            <Link to="/main/movies" className={currCat === CATS.MOVIE ? 'active' : ''} onClick={e => this.props.switchCatDispatch(CATS.MOVIE)}>
              <FormattedMessage id='CATS.movies' />
            </Link>
          </li>
          <li>
            <Link to="/main/tv" className={currCat === CATS.TV ? 'active' : ''} onClick={e => this.props.switchCatDispatch(CATS.TV)}>
              <FormattedMessage id='CATS.tv' />
            </Link>
          </li>
          <li>
            <Link to="/main/docs" className={currCat === CATS.DOC ? 'active' : ''} onClick={e => this.props.switchCatDispatch(CATS.DOC)}>
              <FormattedMessage id='CATS.docs' />
            </Link>
          </li>
          <li>
            <Link to="/main/anime" className={currCat === CATS.ANIME ? 'active' : ''} onClick={e => this.props.switchCatDispatch(CATS.ANIME)}>
              <FormattedMessage id='CATS.anime' />
            </Link>
          </li>
        </ol>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  uiState: store.uiReducer,
  dataState: store.dataReducer
});

const mapDispatchToProps = (dispatch) => ({
  switchCatDispatch: (cat) => {
    dispatch(switchCatAct(cat));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);