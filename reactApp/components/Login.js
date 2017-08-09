var React = require('react');
var axios = require('axios');

import { HashRouter, Link, Redirect } from 'react-router-dom';

class Login extends React.Component{
  constructor(props) {
     super(props);

    this.state = {
     username: '',
     password: ''
  };
}

submit(){
  axios.post('/login', {
    username: this.state.username,
    password: this.state.password
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

  render(){
    return (
      <div>
        <div className={'has-text-centered'}><h1>Login</h1></div>
        {/* //method="POST" is default  */}
        <form className='container'>
          <div className={"field"}>
            <div className={"control has-icons-left has-icons-right"}>
              <input className={"input is-danger"} type="text" onChange={(e)=>this.setState({username: e.target.value})} placeholder="Username" value={this.state.username}/>
              <span className={"icon is-small is-left"}>
                <i className={"fa fa-user"}></i>
              </span>
            </div>
          </div>
          <div className={"field"}>
            <div className={"control has-icons-left has-icons-right"}>
              <input className={"input is-danger"} type="password" onChange={(e)=>this.setState({password: e.target.value})} placeholder="Password" value={this.state.password}/>
              <span className={"icon is-small is-left"}>
                <i className={"fa fa-envelope"}></i>
              </span>
            </div>
          </div>
          <div className={"control"}>
            <button className={"button is-primary"} onClick={()=>this.submit()}>Login</button>
          </div>
          <div className={"control"}>
            <button className={"button "} onClick={() => this.props.history.push('/register')}>Register</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login;
