var React = require('react');
var classNames = require('classnames');
import ReactDOM from 'react-dom';

class Docs extends React.Component {
  constructor(){
    super();
    this.state={
      modalOpen1: false,
      modalOpen2: false
    }
  }
  modal1Toggle(e){
    e.preventDefault();
     this.setState({
       modalOpen1: !this.state.modalOpen1
     })
  }
  modal2Toggle(e){
    e.preventDefault();
    this.setState({
      modalOpen2: !this.state.modalOpen2
    })
  }
  createDoc(e){

  }
  render(){
      var modalClass1 = classNames({
        'modal': true,
        'is-active': this.state.modalOpen1
      });
      var modalClass2 = classNames({
        'modal': true,
        'is-active': this.state.modalOpen2
      });
    return(
      <div>
        <h1>Document Portal</h1>
        <div>
          <button className='is-button' onClick={(e)=>this.modal1Toggle(e)}>New Document
          </button>
          <div className={modalClass1}>
            <div className="modal-background" onClick={(e)=>this.modal1Toggle(e)}></div>
            <div className="modal-content">
              <div className='box'>Doc Name input
                <input type='text' />
                <input type="submit" value="Create" onClick={(e)=>{
                  this.modal1Toggle(e)
                  this.createDoc(e) }}/>
              </div>
            </div>
            <button className="modal-close is-large" onClick={(e)=>this.modal1Toggle(e)}></button>
          </div>
        </div>
        <div>
          <button className='is-button' onClick={(e)=>this.modal2Toggle(e)}>Add Shared Document
        </button>
        <div className={modalClass2}>
          <div className="modal-background" onClick={(e)=>this.modal2Toggle(e)}></div>
          <div className="modal-content">
            <div className="box">Doc Collab input
            <input type='text'/>
            <input type="submit" value="Create" onClick={(e)=>this.modal2Toggle(e)}/>
          </div>
        </div>
          <button className="modal-close is-large" onClick={(e)=>this.modal2Toggle(e)}></button>
        </div>
        </div>
        <div>
          Doc List
        </div>
      </div>
    )
  }
}

export default Docs;
