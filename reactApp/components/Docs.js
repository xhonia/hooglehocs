var React = require('react');
var classNames = require('classnames');
import ReactDOM from 'react-dom';
var axios = require('axios');
import { HashRouter, Link, Route, Switch } from 'react-router-dom';


class Docs extends React.Component {
  constructor(props){
    super(props);
    this.state={
      modalOpen1: false,
      modalOpen2: false,
      docid: '',
      title:'Untitled',
      docs: []
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3000/doclist')
    .then((response)=> {

      console.log("data cdm",response.data);
       this.setState({docs: response.data})
       console.log("state.docs",this.state.docs);
    })
    .catch((err)=>{
      console.log("err:",err);

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

    console.log("createDoc clicked");
    this.props.history.push('/editor')
  }
  docClick(e){

    console.log("doc that was clicked:", e.currentTarget.textContent);
    // axios.get('http://localhost:3000/newdoc', {
    //   e.currentTarget.textContent
    // })
    this.props.history.push('/editor')

  }
  fetch(){
    console.log(this.state.docid)
    var socket = io.connect('http://localhost:3000');
    socket.emit('grabfile', { docid: this.state.docid });
    socket.on('errid', function(data){
      alert('invalid: ', data)
    })
    socket.on('suc', (data)=>{
      console.log('sucdoc returned', data)
      console.log(this.props);
      this.props.history.push('/editor')
    })
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
                <input type='text' value={this.state.title} onChange={(e)=>this.setState({title: e.target.value})} />
                <input type="submit" value="Create" onClick={(e) => {
                  this.modal1Toggle(e)
                  this.createDoc(e)
                  this.props.history.push('/editor')
                }}/>
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
            <div className="box">Enter doc id
            <input type='text' onChange={(e)=>this.setState({docid: e.target.value})}/>
            <input type="submit" value="Fetch" onClick={(e)=>{this.modal2Toggle(e), this.fetch()}}/>
          </div>
        </div>
          <button className="modal-close is-large" onClick={(e)=>this.modal2Toggle(e)}></button>
        </div>
        </div>
        <div className='box'>
          Doc List

          {this.state.docs.map((doc)=><Link to={`/editor/${doc._id}`} key={doc._id} >{doc.title}</Link>)}

        </div>
        <div>
          <button onClick={()=>this.props.history.push('/')}>Logout</button>
        </div>
      </div>
    )
  }
}


// ReactDOM.render(
// <Docs/>,
//   document.getElementById('root')
// );

export default Docs;
