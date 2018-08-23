import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadDetailsAct } from '../actions/detailsActions';
import Pages from '../components/pages';

import posterPrefix from '../images/posters/Movies.png';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loadDetails(key, list) {
    this.props.loadDetailsDispatch(key, list);
  }

  render() {
    const buffer = this.props.dataRef;

    return (
      <div className="card-list">
        {Object.keys(buffer).map((key) => {
          return <div className="card" key={key}>
            <Link to={'/main/details/' + key} onClick={e => this.loadDetails(key, 'main')}>
              {buffer[key].poster && buffer[key].poster !== 'N/A' ?
                <img alt="Poster" src={buffer[key].poster} /> : <img alt="Poster" src={posterPrefix} />
              }
            </Link>
            <h2 className="title">{buffer[key].eng_title}</h2>
            <h4 className="year">{buffer[key].year}</h4>
          </div>
        })}
        {this.props.showPages && buffer && Object.keys(buffer).length && <Pages />}
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  // dataState: store.dataReducer
});

const mapDispatchToProps = (dispatch) => ({
  loadDetailsDispatch: (key, list) => {
    dispatch(loadDetailsAct(key, list))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
