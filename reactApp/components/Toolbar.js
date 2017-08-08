import React from 'react';

const Toolbar = ({boldClicked, italicClicked, underlineClicked, codeClicked}) => {
  return (
    <div>
      <button onClick={(e) => boldClicked(e)}>BOLD</button>
      <button onClick={(e) => italicClicked(e)}>ITALIC</button>
      <button onClick={(e) => underlineClicked(e)}>UNDERLINE</button>
      <button onClick={(e) => codeClicked(e)}>CODE</button>
    </div>
  );
}
export default Toolbar;
