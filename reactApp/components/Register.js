var React = require('react');
import ReactDOM from 'react-dom';
import { HashRouter, Link, Redirect } from 'react-router-dom';
var axios = require('axios');

class Register extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }
  render(){
    return(
      <div>
        <div className={'has-text-centered'}><h1>Register</h1></div>
        <div className={"field"}>
          <label className={"label"}>Name</label>
          <div className={"control"}>
            <input className={"input"} type="text" placeholder="Text input"/>
          </div>
        </div>


        <div className={"field"}>
          <label className={"label"}>Username</label>
          <div className={"control has-icons-left has-icons-right"}>
            <input className={"input is-success"} type="text" placeholder="Text input" />
            <span className={"icon is-small is-left"}>
              <i className={"fa fa-user"}></i>
            </span>
            <span className={"icon is-small is-right"}>
              <i className={"fa fa-check"}></i>
            </span>
          </div>
          <p className={"help is-success"}>This username is available</p>
        </div>

        <div className={"field"}>
          <label className={"label"}>Email</label>
          <div className={"control has-icons-left has-icons-right"}>
            <input className={"input is-danger"} type="text" placeholder="Email input" />
            <span className={"icon is-small is-left"}>
              <i className={"fa fa-envelope"}></i>
            </span>
            <span className={"icon is-small is-right"}>
              <i className={"fa fa-warning"}></i>
            </span>
          </div>
          <p className={"help is-danger"}>This email is invalid</p>
        </div>

        <div className={"field"}>
          <label className={"label"}>Password</label>
          <div className={"control has-icons-left has-icons-right"}>
            <input className={"input is-danger"} type="password" placeholder="Password" />
            <span className={"icon is-small is-left"}>
              <i className={"fa fa-envelope"}></i>
            </span>
            <span className={"icon is-small is-right"}>
              <i className={"fa fa-warning"}></i>
            </span>
          </div>
        </div>

        <div className={"field"}>
          <label className={"label"}>Confirm Password</label>
          <div className={"control has-icons-left has-icons-right"}>
            <input className={"input is-danger"} type="password" placeholder="Confirm Password" />
            <span className={"icon is-small is-left"}>
              <i className={"fa fa-envelope"}></i>
            </span>
            <span className={"icon is-small is-right"}>
              <i className={"fa fa-warning"}></i>
            </span>
          </div>
        </div>
        <div className={"field is-grouped"}>
          <div className={"control"}>
            <button className={"button is-primary"}>Submit</button>
          </div>
          <div className={"control"}>
            <button className={"button is-link"}>Cancel</button>
          </div>
        </div>
        <div className={"control"}>
          <button className={"button "} onClick={() => history.push('/')}>Login</button>
        </div>

      </div>
    )
  }
}
export default Register;
