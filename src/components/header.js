import axios from 'axios';
import { NODE_URL } from '../util/utils';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { switchCatAct } from '../actions/categoriesActions';
import { toggleEditDetailsAct } from '../actions/uiActions';
import Search from '../components/search';
import cats from '../util/cats';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgData: []
    };

    /**
     * Image base64 loading tryout
     */
    // axios.post(NODE_URL() + '/images/get/3d.png').then(res => {
    //   this.setState((prevState) => ({
    //     imgData: [...prevState.imgData, ...res.data.data]
    //   }))
    // }).catch(err => console.log(err));
  }

  render() {
    const imgArr = this.state.imgData;
    //background: url('data:image/svg+xml; ... ');

    return (
      <nav className="header">
        {Object.keys(imgArr).map((i) => {
          return <img src={"data:image/png;base64," + imgArr[i]} key={i} alt="" />
        })}
        <a target="_blank" href="http://localhost:5000" rel="noopener noreferrer" className="logo" title="Local NAS Shortcut"></a>
        <div className="nav-opts">
          <Search />
          <Link to="/main/home" className="opt-home" title="Home" onClick={e => this.props.switchCatDispatch(cats.HOME)}></Link>
          <a className="opt-add" title="Add video" onClick={e => this.props.editDetailsDispatch(true, true)}></a>
          <a target="_blank" rel="noopener noreferrer" href="http://quickconnect.to/phantomzone" className="opt-quick" title="Quick connect" ></a>
          {/* <Link to="/main/notices" className="opt-notice" title="Notifications"></Link> */}
          {/* <Link to="/main/messages" className="opt-msg" title="Messages"></Link> */}
          <Link to="/main/me" className="opt-me" title="Me">{this.props.loginState.user}</Link>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (store) => ({
  loginState: store.loginReducer
});

const mapDispatchToProps = (dispatch) => ({
  switchCatDispatch: (cat) => {
    dispatch(switchCatAct(cat))
  },
  editDetailsDispatch: (status, newRec) => dispatch(toggleEditDetailsAct(status, newRec))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);