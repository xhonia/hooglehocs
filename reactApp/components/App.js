var React = require('react');
import ReactDOM from 'react-dom';
import {Editor, EditorState, Modifier, RichUtils} from 'draft-js';
import Toolbar from './/Toolbar';
import Register from './Register';
import Login from './Login';
import { HashRouter, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import MyEditor from './MyEditor';

// Add Decoration in Toolbar

class App extends React.Component {
  render(){
    return(
      <Login/>
    )
  }
}

export default App;
