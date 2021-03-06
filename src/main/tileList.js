import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setKeyAct } from '../../actions/dataActions';
import { removeHomeListItemAct } from '../../actions/homeActions';
import { loadDetailsAct } from '../../actions/detailsActions';
import Pages from '../components/pages';

class TileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  delItem(e, key) {
    e.preventDefault();
    this.props.removeHomeListItemDispatch(this.props.list, key);
  }

  loadDetails(key, ref) {
    this.props.setKeyDispatch(key);
    this.props.loadDetailsDispatch(ref);
  }

  render() {
    const buffer = this.props.dataRef;
    // const { dataState } = this.props;

    return (
      <div className="tile-list">
        {Object.keys(buffer).map((key) => {
          return <div className="tile" key={key}>
            <Link to={'/main/details'} onClick={e => this.loadDetails(key, 'main')}>
              {this.props.delBtn && <div className="del-item" title="Remove from the list" onClick={e => this.delItem(e, key)}></div>}
              {buffer[key].poster && buffer[key].poster !== 'N/A' ?
                <img alt="Poster" src={buffer[key].poster} /> :
                <div className={'dummy-poster poster-' + buffer[key].category.toLowerCase()}></div>}
            </Link>
            <div className="info">
              <div className="title">{buffer[key].eng_title}</div>
              <div className="details">
                <span className="year">{buffer[key].year}</span><br />
                {buffer[key].director || buffer[key].creator || buffer[key].prod}
              </div>
            </div>
          </div>
        })}
        {this.props.showPages && buffer && buffer.length && <Pages />}
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
  },
  removeHomeListItemDispatch: (list, key) => {
    dispatch(removeHomeListItemAct(list, key))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TileList);
