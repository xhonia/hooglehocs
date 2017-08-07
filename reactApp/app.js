var React = require('react');
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
// import 'bulma/css/bulma.css'

//lisa was here

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
    return (
      <div className={'hero is-large is-light is-bold is-fullheight'}>
        <div className={'has-text-centered box is-light'}>
            <button className={"button is-light"}>Button1</button>
            <button className={"button is-light"}>Button2</button>
        </div>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
      </div>

    );
  }
}

ReactDOM.render(
  <MyEditor/>,
  document.getElementById('root')
);
