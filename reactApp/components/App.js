var React = require('react');
import ReactDOM from 'react-dom';
import {Editor, EditorState, Modifier, RichUtils} from 'draft-js';
import Toolbar from './/Toolbar';
import Register from './Register';
import Login from './Login';

import { HashRouter, Link, Route, Switch } from 'react-router-dom';

import { Redirect } from 'react-router';
import MyEditor from './MyEditor';

// Add Decoration in Toolbar

class App extends React.Component {
  render(){
    return(

      <div>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/register' component={Register}/>
      </Switch>
    </div>

    )
  }
}

export default App;