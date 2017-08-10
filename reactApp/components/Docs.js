var React = require('react');
var classNames = require('classnames');
import ReactDOM from 'react-dom';
var axios = require('axios');

class Docs extends React.Component {
  constructor(){
    super();
    this.state={
      modalOpen1: false,
      modalOpen2: false,
      title:'Untitled'
    }
  }
  componentDidMount(){
    axios.get('http://localhost:3000/doclist')
    .then((response)=> {
      var docs = response
    })
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
    var date = new Date();
    axios.post('/newdoc', {
      title: this.state.title,
      date: date

    })
    .then(function (response) {
      console.log(response);
      //if response is good, do something maybe?
    })
    .catch(function (error) {
      console.log(error);
    });
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
        <div className='box'>
          Doc List
          {/* {docs.map((doc)=><div><a>{doc}</a></div>)} */}
        </div>
      </div>
    )
  }
}

export default Docs;a
