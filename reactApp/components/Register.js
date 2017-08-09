var React = require('react');
import ReactDOM from 'react-dom';
import { HashRouter, Link, Redirect } from 'react-router-dom';
var axios = require('axios');

class Register extends React.Component{
  constructor(props) {
     super(props);
    this.state = {
     username: '',
     password: '',
     rppassword:'',
     email: '',
  };
}

verify(){
  if(this.state.username===''){
    alert('Username cannot be empty')
  } else if(this.state.email===''){
    alert('Email cannot be empty')
  } else if(this.state.password===''){
    alert('Password cannot be empty')
  } else if(this.state.rppassword===''){
    alert('Please confirm password')
  } else if(this.state.password!==this.state.rppassword){
    alert('Passwords do not match')
  } else {
    this.submit()
  }

submit(){
  var self = this;
  axios.post('http://localhost:3000/register', {
    username: this.state.username,
    password: this.state.password,
    email: this.state.email
  })
  .then((response)=> {
    console.log("resp",response);
    console.log("data",response.data);
    if(response.data==='welcome'){
      self.props.history.push('/')
    }

  })
  .catch(function (error) {
    console.log(error);
  });
}

render(){
  return(
    <div>
      <div className={'has-text-centered'}><h1>Register</h1></div>
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
              <input className={"input is-danger"} type="text" onChange={(e)=>this.setState({email: e.target.value})} placeholder="Email" value={this.state.email}/>
              <span className={"icon is-small is-left"}>
                <i className={"fa fa-envelope"}></i>
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
          <div className={"field"}>
            <div className={"control has-icons-left has-icons-right"}>
              <input className={"input is-danger"} type="password" onChange={(e)=>this.setState({rppassword: e.target.value})} placeholder="Confirm Password" value={this.state.rppassword}/>
              <span className={"icon is-small is-left"}>
                <i className={"fa fa-key"}></i>
              </span>
            </div>
          </div>
          <div className={"field is-grouped"}>
            <div className={"control"}>
              <button className={"button is-primary"} onClick={()=>this.verify()}>Submit</button>
            </div>
          </div>


        </form>

      <div className={"control"}>
        <button className={"button "} onClick={() => this.props.history.push('/')}>Login</button>
      </div>

    </div>
  )
}
}
export default Register;
