import React from 'react';
import classNames from 'classnames';
var axios = require('axios');
import {Editor, EditorState, Modifier, RichUtils, ContentState , convertToRaw, convertFromoRaw} from 'draft-js';

class Toolbar extends React.Component {
  constructor(props){
    super(props);
     this.state = {
       title: this.props.title,
       modal: false
     }
  }
  docSave(){
    var content = this.props.editorState.getCurrentContent()
    console.log("var content", content);
    var rawContent = convertToRaw(content)
    console.log("raw content state:", rawContent);
    var date = new Date();
    //{content:JSON.stringify(rawContent), title: this.state.title}
    axios.post('http://localhost:3000/newdoc', {
      method: "POST",
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: {content:JSON.stringify(rawContent), title: this.state.title}
    } )
    // fetch('http://localhost:3000/newdoc', {
    //   method: "POST",
    //   credentials: 'include',
    //   headers: {'Content-Type': 'application/json'},
    //   body: {name: "xhonia"}
    // })
    .then(function (response) {
      console.log("success response on creat doc",response);
      //if response is good, do something maybe?
    })
    .catch(function (error) {
      console.log("more errors, yay!",error);
    });
  }
  titleClick(e){
    console.log("title clicked!");
    this.setState({modal: !this.state.modal})
  }
  render(){
    var modal = classNames({
      'modal': true,
      'is-active': this.state.modal
    });
    return(
      <div style={{paddingTop: '10px'}} className={'columns  is-centered'}>
        <div className='has-text-centered'><a onClick={()=> this.titleClick()}>{this.state.title}</a></div>
        <div className={modal}>
          <div className="modal-background" onClick={(e)=>this.titleClick(e)}></div>
          <div className="modal-content">
            <div className='box'>title update
              <input type='text' value={this.state.title} onChange={(e)=>this.setState({title: e.target.value})} />
              <input type="submit" value="save" onClick={(e) => {this.titleClick(e)}}/>
            </div>
          </div>
          <button className="modal-close is-large" onClick={(e)=>this.titleClick(e)}></button>
        </div>
        <div className={'column '}>
      <div className={"field has-addons has-text-centered"}>
        <p className={"control"}>
        <button className={"button is-light is-inverted is-outlined"} onClick={(e) => this.props.boldClicked(e)}>
          <span className="icon is-small">
          <i className="fa fa-bold"></i>
        </span>
        {/* <span>Bold</span> */}
      </button>
        </p>
        <p className={"control"}>
        <button className={"button is-light is-inverted is-outlined"} onClick={(e) => this.props.italicClicked(e)}>
          <span className="icon is-small">
          <i className="fa fa-italic"></i>
        </span>
        </button>
          </p>
        <p className={"control"}>
        <button className={"button is-light is-inverted is-outlined"} onClick={(e) => this.props.underlineClicked(e)}>
          <span className="icon is-small">
          <i className="fa fa-underline"></i>
        </span>
        </button>
      </p>
        <p className={"control"}>
        <button className={"button is-light is-inverted is-outlined"} onClick={(e) => this.props.codeClicked(e)}>CODE</button>
      </p>
        <p className={"control"}>
        <button className={"button is-light is-inverted is-outlined"} >COLOR</button>
        </p>
      </div>

      </div>
      <div className={'column '}>
        <button className={"button is-light is-inverted "} onClick={(e) => this.docSave(e)}>SAVE</button>
        {/* implement mongo functionality */}
        </div>
    </div>
    )
  }
}
export default Toolbar;
