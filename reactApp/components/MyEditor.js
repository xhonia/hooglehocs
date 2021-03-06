var React = require('react');
import ReactDOM from 'react-dom';
import {Editor, EditorState, Modifier, RichUtils, ContentState, convertFromRaw} from 'draft-js';
import Toolbar from './Toolbar';
import Register from './Register';
var axios = require('axios');


// Add Decoration in Toolbar
const decorationStyleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
};

// Add Colors in Toolbar

class StyleButton extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let style;
    if (this.props.active) {
      style = Object.assign({}, styles.styleButton, colorStyleMap[this.props.style]);
    } else {
      style = styles.styleButton;
    }
    return (
      <span style={style} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    fontSize: 14
  },
  // editor: {
  //   borderTop: '1px solid #ddd',
  //   cursor: 'text',
  //   fontSize: 16,
  //   marginTop: 20,
  //   minHeight: 400,
  //   paddingTop: 20,
  // },
  controls: {
    fontFamily: '\'Helvetica\', sans-serif',
    fontSize: 14,
    marginBottom: 10,
    userSelect: 'none',
  },
  styleButton: {
    color: '#999',
    cursor: 'pointer',
    marginRight: 16,
    padding: '2px 0',
  },
};

var COLORS = [
 {label: 'Red', style: 'red'},
 {label: 'Orange', style: 'orange'},
 {label: 'Yellow', style: 'yellow'},
 {label: 'Green', style: 'green'},
 {label: 'Blue', style: 'blue'},
 {label: 'Indigo', style: 'indigo'},
 {label: 'Violet', style: 'violet'},
];

const colorStyleMap = {
  red: {
    color: 'rgba(255, 0, 0, 1.0)',
  },
  orange: {
    color: 'rgba(255, 127, 0, 1.0)',
  },
  yellow: {
    color: 'rgba(180, 180, 0, 1.0)',
  },
  green: {
    color: 'rgba(0, 180, 0, 1.0)',
  },
  blue: {
    color: 'rgba(0, 0, 255, 1.0)',
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)',
  },
  violet: {
    color: 'rgba(127, 0, 255, 1.0)',
  },
};

const ColorControls = (props) => {
 var currentStyle = props.editorState.getCurrentInlineStyle();
 return (
   <div style={styles.controls}>
     {COLORS.map(type =>
       <StyleButton
         active={currentStyle.has(type.style)}
         label={type.label}
         onToggle={props.onToggle}
         style={type.style}
         key={type.label}
       />
     )}
   </div>
 );
};


// MyEditor Component
class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: "Untitled"
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.toggleColor = (toggledColor) => this.toggleColor(toggledColor);
  }
  componentDidMount(){
    console.log("props", this.props.match);
    fetch(`http://localhost:3000/opendoc?id=${this.props.match.params.id}`, {
      credentials: 'include',
    })
    .then((response)=>{
      // console.log("find the raw content to convert from:", response.json());
        // var notRaw =  convertFromRaw(response.data.content);
        // console.log("converted from raw", notRaw);
        // this.setState({
        //   editorState: EditorState.createWithContent(notRaw),
        //   title: response.data.title
        // })
      return response.json();
    })
    .then((resp) => {
      console.log("RESP: ", resp);
      var notRaw =  convertFromRaw(JSON.parse(resp.content));
      console.log("converted from raw", notRaw);
      this.setState({
        editorState: EditorState.createWithContent(notRaw),
        title: resp.title
      })
    })
    .catch((err)=>{
      console.log("error getting doc page", err);
    })
  }
  // Color Inline Style
  toggleColor(toggledColor) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }
    this.onChange(nextEditorState);
  }

  // Simple Inline Styles
  boldClicked(e) {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      "BOLD"
    ))
  }
  italicClicked(e) {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      "ITALIC"
    ))
  }
  underlineClicked(e) {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      "UNDERLINE"
    ))
  }
  codeClicked(e) {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      "CODE"
    ))
  }
  strikethroughClicked(e) {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      styleMap["STRIKETHROUGH"]
    ))
  }



  render() {

    return (
      <div className={'hero is-large is-light is-bold is-fullheight'}>
        <div className={'has-text-centered is-centered is-light'}>
          <div className={'is centered'} style={styles.root}>

              <h1>{this.props.title}</h1>
            {/* <ColorControls
              editorState={this.state.editorState}
              onToggle={this.toggleColor}
            /> */}

            <Toolbar title={this.state.title} editorState={this.state.editorState} boldClicked={(e) => this.boldClicked(e)}
              italicClicked={(e) => this.italicClicked(e)}
              underlineClicked={(e) => this.underlineClicked(e)}
              codeClicked={(e) => this.codeClicked(e)}



            />

            <div style={styles.editor} onClick={this.focus}>
              <Editor editorState={this.state.editorState}
                onChange={this.onChange}
                customStyleMap={colorStyleMap}
                placeholder="Start editing your text here..."
                ref="editor"
                // handleKeyCommand={this.handleKeyCommand}
              />
            </div>
            <a onClick={()=>this.props.history.push('/docs')}>Docs</a>

          </div>
          {/* <Register/> */}
        </div>
      </div>
    );
  }
}
// ReactDOM.render(
// <MyEditor/>,
//   document.getElementById('root')
// );

export default MyEditor;
