import React from 'react';

const Toolbar = ({boldClicked, italicClicked, underlineClicked, codeClicked, strikethroughClicked, overlineClicked, centerAlign, rightAlign, leftAlign}) => {
  return (
    <div>
      <button onClick={(e) => boldClicked(e)}>BOLD</button>
      <button onClick={(e) => italicClicked(e)}>ITALIC</button>
      <button onClick={(e) => underlineClicked(e)}>UNDERLINE</button>
      <button onClick={(e) => codeClicked(e)}>CODE</button>
      <button onClick={(e) => strikethroughClicked(e)}> STRIKETHROUGH </button>
      <button onClick={(e) => overlineClicked(e)}> OVERLINE </button>
      <button onClick={(e) => centerAlign(e)}> CENTER ALIGN </button>
      <button onClick={(e) => rightAlign(e)}> RIGHT ALIGN </button>
      <button onClick={(e) => leftAlign(e)}> LEFT ALIGN </button>
    </div>
  );
}
export default Toolbar;
