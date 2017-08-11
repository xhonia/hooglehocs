var React = require('react');
var axios = require('axios');

import { HashRouter, Link, Redirect } from 'react-router-dom';

class Login extends React.Component{
  constructor(props) {
     super(props);
    this.state = {
     username: '',
     password: '',
     loggedIn: false
  };
}

submit(e){
  e.preventDefault()
  //var self=this
  // console.log(this);
  axios.post('http://localhost:3000/login', {
    username: this.state.username,
    password: this.state.password
  })
  .then(function (response) {
    if (response.data==='yo'){
      this.props.history.push('/docs')
      console.log('HHHHHHHHHH');
    } else {
      this.props.history.push('/login')
      alert('Invalid user')
    }
  }.bind(this))
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
              <input className="input is-danger" type="text" onChange={(e)=>this.setState({username: e.target.value})} placeholder="Username" value={this.state.username}/>
              <span className={"icon is-small is-left"}>
                <i className={"fa fa-user"}></i>
              </span>
            </div>
          </div>
          <div className={"field"}>
            <div className={"control has-icons-left has-icons-right"}>
              <input className={"input is-danger"} type="password" onChange={(e)=>this.setState({password: e.target.value})} placeholder="Password" value={this.state.password}/>
              <span className={"icon is-small is-left"}>
                <i className={"fa fa-key"}></i>
              </span>
            </div>
          </div>
          <div className={"control"}>
            <button className={"button is-primary"} onClick={this.submit.bind(this)}>Login</button>
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
