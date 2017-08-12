var React = require('react');
import ReactDOM from 'react-dom';
import {Editor, EditorState, Modifier, RichUtils, getDefaultKeyBinding, KeyBindingUtil} from 'draft-js';

import './stylesheet/stylesheet.css'

import Toolbar from './components/Toolbar';
import Dropdown from './components/Dropdown';
import ColorControls from './components/ColorControls';
import BlockControls from './components/BlockControls';
import StyleButton from './components/StyleButton';
import styleMap from './map/stylemap'
import extendedBlockRenderMap from './map/blockmap'
import styles from './stylesheet/styles'

const {isCtrlKeyCommand, isOptionKeyCommand, hasCommandModifier} = KeyBindingUtil;
const {undo, redo, getRedoStack} = EditorState;

// TODO: Implement History :
// save raw state and time in an object
// push time into an array
// mapped over it with button
// find corresponding state, and have editor show that


// Possibly important fn
// const block = this.state.editorState.getCurrentContent().getBlockForKey(selection.getAnchorKey());

// MyEditor Component
class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
    this.toggleBlock = (toggledBlock) => this._toggleBlock(toggledBlock);
    this.getBlockStyle = (block) => this._getBlockStyle(block);
  }

  // Color Inline Style
  _toggleColor(toggledColor) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(styleMap)
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

  // _toggleBlock
  _toggleBlock (blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _getBlockStyle (block) {
   const blockStyles = [];
   const styleMap = Object.keys(colorStyleMap);

   switch (block.getType()) {
     case 'unordered-list-item':
       // With draft JS we cannot output different styles for the same block type.
       // We can however customise the css classes:
       block.findStyleRanges((item) => {
         const itemStyles = item.getStyle();
         return _.some(styleMap, (styleKey) => itemStyles.includes(styleKey));
       }, (startCharacter) => {
         if (startCharacter === 0) {
           // Apply the same styling to the block as the first character
           _.each(block.getInlineStyleAt(startCharacter).toArray(), (styleKey) => {
             blockStyles.push(`block-style-${styleKey}`);
           });
         }
       });

       return blockStyles.join(' ');
     default:
       return null;
   }
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
      "STRIKETHROUGH"
    ))
  }
  overlineClicked(e) {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      "OVERLINE"
    ))
  }

  // Tab Key (Not spacing +5)
  _onTab(e) {
    console.log('onTab');
    e.preventDefault()
    this.onChange(RichUtils.onTab(
      e,
      this.editorState,
      5
    ));
  }

// Alignment Functions
  leftAlign(e) {
    const myEditorState = RichUtils.toggleBlockType(this.state.editorState, 'leftAlign');
    this.onChange(myEditorState)
  }
  rightAlign(e) {
    const myEditorState = RichUtils.toggleBlockType(this.state.editorState, 'rightAlign');
    this.onChange(myEditorState)
  }
  centerAlign(e) {
    const myEditorState = RichUtils.toggleBlockType(this.state.editorState, 'centerAlign');
    this.onChange(myEditorState)
  }

  // Block Type Render Fn
  myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    switch (type) {
      case 'leftAlign': {
          return 'leftAlignCSS';
      }
      case 'rightAlign': {
          return 'rightAlignCSS';
      }
      case 'centerAlign': {
          return 'centerAlignCSS';
      }
    }
  }

  // Key Binding functions
  myKeyBindingFn(e) {
    if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
      console.log('save')
      return 'save';
    }
    if (e.keyCode === 66 /* `B` key */ && hasCommandModifier(e)) {
      console.log('bold');
      return 'bold'
    }
    if (e.keyCode === 73 /* `I` key */ && hasCommandModifier(e)) {
      console.log('italic');
      return 'italic'
    }
    if (e.keyCode === 85 /* `U` key */ && hasCommandModifier(e)) {
      console.log('underline');
      return 'underline'
    }
    return getDefaultKeyBinding(e);

    // Undo
    // if (e.keyCode === 90 /* `S` key */ && hasCommandModifier(e)) {
    //   console.log('undo');
    //   return 'undo'
    // }
    // Redo
    // if (e.keyCode === 89 /* `S` key */ && hasCommandModifier(e)) {
    //   console.log('redo');
    //   return 'redo'
    // }

  }

  // Key Command Handler
  handleKeyCommand(command) {
    // console.log(command)

    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

    // Undo isn't flowinig through here
    // Because it's a native command

    switch(command) {
      // case 'save':
      //   console.log('key saved')
      //   this.onChange(newState);
      //   return 'handled';
      case 'tab':
        console.log('that happened');
        return 'handled';
      // case 'undo':
      //   console.log('undo saved')
      //   undo(this.state.editorState)
      //   this.onChange(this.state.editorState)
      //   return 'handled'
      // case 'redo':
      //   console.log('redo saved')
      //   redo(this.state.editorState)
      //   this.onChange(this.state.editorState)
      //   return 'handled'
      case 'bold':
        console.log('bold saved')
        this.boldClicked()
        return 'handled';
      case 'italic':
        console.log('italic saved')
        this.italicClicked()
        return 'handled';
      case 'underline':
        console.log('underline saved')
        this.underlineClicked()
        return 'handled';
    }
    console.log('not saved handleKeyCommand')
    return 'not-handled';
  }
  //

  // Font Size function
  toggleFont(e) {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      e
    ))
  }

  render() {
    return (
      // <div style={styles.root}>
      <div>
        <h1>My Heditor</h1>

        <ColorControls
          editorState={this.state.editorState}
          onToggle={this.toggleColor}
        />

        <BlockControls
         editorState={this.state.editorState}
         onToggle={this.toggleBlock}
       />

        <Toolbar boldClicked={(e) => this.boldClicked(e)}
                 italicClicked={(e) => this.italicClicked(e)}
                 underlineClicked={(e) => this.underlineClicked(e)}
                 codeClicked={(e) => this.codeClicked(e)}
                 strikethroughClicked={(e) => this.strikethroughClicked(e)}
                 overlineClicked={(e) => this.overlineClicked(e)}
                 centerAlign={(e) => this.centerAlign(e)}
                 rightAlign={(e) => this.rightAlign(e)}
                 leftAlign={(e) => this.leftAlign(e)}
        />
        <Dropdown toggleFont={(e) => this.toggleFont(e)}
        />

        <div onClick={this.focus}>
          <Editor editorState={this.state.editorState}
                  onChange={this.onChange}
                  blockRenderMap={extendedBlockRenderMap}
                  customStyleMap={styleMap}
                  placeholder="Start editing your text here..."
                  ref="editor"
                  // indent={(e) => this.indent(e)}
                  handleKeyCommand={this.handleKeyCommand}
                  keyBindingFn={this.myKeyBindingFn}
                  blockStyleFn={this.myBlockStyleFn}
                  onTab={this._onTab}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <MyEditor />,
  document.getElementById('root')
);
