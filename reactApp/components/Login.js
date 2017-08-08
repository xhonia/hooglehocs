var React = require('react');
import { HashRouter, Link, Redirect } from 'react-router-dom';

const Login = ({history})=>{
  return(
    <div>
    <div>
      <div className={'has-text-centered'}><h1>Login</h1></div>


  <div className={"field"}>
  <label className={"label"}>Username</label>
  <div className={"control has-icons-left has-icons-right"}>
    <input className={"input is-success"} type="text" placeholder="Text input" value="bulma"/>
    <span className={"icon is-small is-left"}>
      <i className={"fa fa-user"}></i>
    </span>
    <span className={"icon is-small is-right"}>
    </span>
  </div>
  </div>

  <div className={"field"}>
  <label className={"label"}>Password</label>
  <div className={"control has-icons-left has-icons-right"}>
    <input className={"input is-danger"} type="text" placeholder="Password" value=""/>
    <span className={"icon is-small is-left"}>
      <i className={"fa fa-envelope"}></i>
    </span>
    <span className={"icon is-small is-right"}>
    </span>
  </div>
  </div>

  </div>
  <div className={"field is-grouped"}>
  <div className={"control"}>
    <button className={"button is-primary"}>Login</button>
  </div>
  </div>
  <div className={"control"}>
  <button className={"button "} onClick={() => history.push('/register')}>Register</button>
  </div>
    </div>

  )
}

export default Login;
