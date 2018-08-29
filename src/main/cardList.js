import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pages from '../components/pages';
import reel from '../images/posters/reel.png';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const buffer = this.props.dataRef;
    const tglPages = this.props.uiState.tglPages;

    return (
      <div className="card-list">
        {Object.keys(buffer).map((key) => {
          return <div className="card" key={key}>
            <Link to={'/main/details/' + key}>
              {buffer[key].poster && buffer[key].poster !== 'N/A' ?
                <img alt="Poster" src={buffer[key].poster} /> : <img alt="No poster available" src={reel} />
              }
            </Link>
            <h2 className="title">{buffer[key].eng_title}</h2>
            <h4 className="year">{buffer[key].year}</h4>
          </div>
        })}
        <div className={tglPages ? 'pages-holder fadeIn' : 'pages-holder' }>
          {tglPages && this.props.usePages && buffer && Object.keys(buffer).length && <Pages />}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  uiState: store.uiReducer
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
