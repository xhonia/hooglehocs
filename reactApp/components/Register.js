var React = require('react');
import ReactDOM from 'react-dom';

const Register= ()=>{
  return(
    <div>
      <div className={"field"}>
  <label className={"label"}>Name</label>
  <div className={"control"}>
    <input className={"input"} type="text" placeholder="Text input"/>
  </div>
</div>

<div className={"field"}>
  <label className={"label"}>Username</label>
  <div className={"control has-icons-left has-icons-right"}>
    <input className={"input is-success"} type="text" placeholder="Text input" value="bulma"/>
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
    <input className={"input is-danger"} type="text" placeholder="Email input" value="hello@"/>
    <span className={"icon is-small is-left"}>
      <i className={"fa fa-envelope"}></i>
    </span>
    <span className={"icon is-small is-right"}>
      <i className={"fa fa-warning"}></i>
    </span>
  </div>
  <p className={"help is-danger"}>This email is invalid</p>
</div>


<div className={"field is-grouped"}>
  <div className={"control"}>
    <button className={"button is-primary"}>Submit</button>
  </div>
  <div className={"control"}>
    <button className={"button is-link"}>Cancel</button>
  </div>
</div>
    </div>
  )
}

export default 'Register';
