import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { switchCatAct } from '../actions/categoriesActions';
import cats from '../util/cats';

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
            <Link to="/main/movies" className={currCat === cats.MOVIE ? 'active' : ''} onClick={e => this.props.switchCatDispatch(cats.MOVIE)}>
              <FormattedMessage id='cats.movies' />
            </Link>
          </li>
          <li>
            <Link to="/main/tv" className={currCat === cats.TV ? 'active' : ''} onClick={e => this.props.switchCatDispatch(cats.TV)}>
              <FormattedMessage id='cats.tv' />
            </Link>
          </li>
          <li>
            <Link to="/main/docs" className={currCat === cats.DOC ? 'active' : ''} onClick={e => this.props.switchCatDispatch(cats.DOC)}>
              <FormattedMessage id='cats.docs' />
            </Link>
          </li>
          <li>
            <Link to="/main/anime" className={currCat === cats.ANIME ? 'active' : ''} onClick={e => this.props.switchCatDispatch(cats.ANIME)}>
              <FormattedMessage id='cats.anime' />
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