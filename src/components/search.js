import * as React from 'react';
import { connect } from 'react-redux';
import lang from '../i18n/languages';
import { searchAct } from '../actions/searchActions';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { criteria: true };
  }
  
  placeholderTxt() {
    return lang[this.props.uiState.locale]['search.txt']
  }

  // toggleCriteria() {
  //   this.setState({ criteria: !this.state.criteria })
  // }

  handleChange(e) {
    if (e.which === 13) {
      this.props.searchDispatch(e.target.value)
    }
  }

  render() {
    return (
      <div id="search">
        <div id="search-box">
          <input autoFocus type="text" placeholder={this.placeholderTxt()} value={this.state.keyword}
            onChange={(e) => this.handleChange(e)} onKeyDown={(e) => this.handleChange(e)} />
          <div className="mag"></div>
          {/* <div className="arrow" onClick={e => this.toggleCriteria()}></div> */}
        </div>
        {/* <div className={'criteria ' + (this.state.criteria && 'criteria-hide')}></div> */}
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  uiState: store.uiReducer
});

const mapDispatchToProps = (dispatch) => ({
  searchDispatch: (key) => {
    dispatch(searchAct(key))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
