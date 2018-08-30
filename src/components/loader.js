import * as React from 'react';
import { connect } from 'react-redux';
import { TOGGLE_LOADER } from '../actions/uiActions';

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  hideLoader(e) {
    this.props.loaderDispatch();
  }

  render() {
    const { uiState } = this.props;

    return (
      uiState.showLoader &&
      <div className="loader-mask">
        <span className="loader-title">{uiState.loaderTxt}</span>
        {uiState.loading && <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>}
        {!uiState.loading && <button onClick={e => this.hideLoader(e)}>OK</button>}
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  uiState: store.uiReducer
});

const mapDispatchToProps = (dispatch) => ({
  loaderDispatch: () => dispatch({ type: TOGGLE_LOADER, status: false })
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);