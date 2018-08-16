import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerAct } from '../actions/loginActions';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: { firstName: '', lastName: '', email: '', pwd: '' } }
  }

  handleChange(e) {
    if (e.target.name === 'submit') {
      this.props.registerDispatch(this.state.form)
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
      <form className="register-form">
        <div className="logo"></div>
        <input autoFocus type="text" name="firstName" placeholder="First name" value={f.firstName}
          onChange={e => this.handleChange(e)} />
        <input type="text" name="lastName" placeholder="Last name" value={f.lastName}
          onChange={e => this.handleChange(e)} />
        <input type="email" name="email" placeholder="Email" value={f.email}
          onChange={e => this.handleChange(e)} />
        <input type="password" name="pwd" placeholder="Password" value={f.pwd}
          onChange={e => this.handleChange(e)} />
        <span className="sign-up">
          <Link to="">Go to login</Link>
        </span>
        <input type="button" name="submit" value="Register"
          onClick={e => this.handleChange(e)} />
      </form>
    )
  }
}

// Here store is the masterStore defined in index.tsx
const mapStateToProps = (store) => ({
});

const mapDispatchToProps = (dispatch) => ({
  registerDispatch: (form) => {
    dispatch(registerAct(form))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
