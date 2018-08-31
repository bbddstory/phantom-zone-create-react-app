import axios from 'axios';

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAct } from '../actions/loginActions';
import { TOGGLE_LOADER } from '../actions/uiActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: { email: 'leon@gmail.com', pwd: 'leon@gmail.com' } }

    // Global Axios request interceptor
    axios.interceptors.request.use((config) => {
      // console.log('-- Global Axios request intercep');
      
      config.headers.token = this.props.loginState.token;
      return config;
    }, err => {
      console.log(err);
    });
    
    // Global Axios response interceptor
    axios.interceptors.response.use(null, err => {
      // console.log('-- Global Axios response intercep');
      console.log(err);

      if (!err.response) { // err.toString() === 'Error: Network Error'
        this.props.loaderDispatch('Network error: connection refused');
      } else {
        // For handling cookie expiration
        if (err.response.status === 401 || err.response.status === 403) { // Not authorized
          window.location.hash = '';
        }
        if (err.response.status === 406) { // Email not found / Email or password wrong
          console.log(err.response);
          
          this.props.loaderDispatch(err.response.data.data);
        }
      }
    });
  }

  handleChange(e) {
    if (e.target.name === 'submit') {
      this.props.loginDispatch(this.state.form)
    } else {
      this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value
        }
      })
    }
  }

  componentDidMount() {
    document.body.className = '';
  }

  render() {
    const f = this.state.form;

    return (
      <form className="login-form">
        <div className="logo"></div>
        <input autoFocus type="email" name="email" placeholder="Email" value={f.email}
          onChange={e => this.handleChange(e)} onKeyDown={e => this.handleChange(e)} />
        <input type="password" name="pwd" placeholder="Password" value={f.pwd}
          onChange={e => this.handleChange(e)} onKeyDown={e => this.handleChange(e)} />
        <span className="sign-up">
          <Link to="register">Sign me up!</Link>
        </span>
        <input type="button" name="submit" value="Enter"
          onClick={e => this.handleChange(e)} />
      </form>
    )
  }
}

// Here store is the masterStore defined in index.tsx
const mapStateToProps = (store) => ({
  uiState: store.uiReducer,
  loginState: store.loginReducer,
});

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (form) => dispatch(loginAct(form)),
  loaderDispatch: (txt) => dispatch({ type: TOGGLE_LOADER, status: true, loading: false, loaderTxt: txt })
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
