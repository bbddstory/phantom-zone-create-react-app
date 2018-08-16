import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setKeyAct } from '../actions/dataActions';
import { loadDetailsAct } from '../actions/detailsActions';
import Pages from '../components/pages';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loadDetails(key, ref) {
    this.props.setKeyDispatch(key);
    this.props.loadDetailsDispatch(ref);
  }

  render() {
    const buffer = this.props.dataRef;
    // const { dataState } = this.props;

    return (
      <div className="card-list">
        {Object.keys(buffer).map((key) => {
          return <div className="card" key={key}>
            <Link to={'/main/details'} onClick={e => this.loadDetails(key, 'main')}>
              {buffer[key].poster && buffer[key].poster !== 'N/A' ?
                <img alt="Poster" src={buffer[key].poster} /> :
                <img alt="Poster" src={"ui/images/posters/" + buffer[key].category + ".png"} />
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
  loadDetailsDispatch: (list) => {
    dispatch(loadDetailsAct(list))
  },
  setKeyDispatch: (key) => {
    dispatch(setKeyAct(key))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
