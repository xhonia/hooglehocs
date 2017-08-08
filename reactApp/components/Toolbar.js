import React from 'react';

const Toolbar = ({boldClicked, italicClicked, underlineClicked, codeClicked,docSave}) => {
  return (
    <div className={'columns is-multiline is-centered'}>
      <div className={'column is-narrow'}>
    <div className={"field has-addons has-text-centered"}>
      <p className={"control"}>
      <button className={"button is-light is-inverted is-outlined"} onClick={(e) => boldClicked(e)}>
        <span className="icon is-small">
        <i className="fa fa-bold"></i>
      </span>
      {/* <span>Bold</span> */}
    </button>
      </p>
      <p className={"control"}>
      <button className={"button is-light is-inverted is-outlined"} onClick={(e) => italicClicked(e)}>
        <span className="icon is-small">
        <i className="fa fa-italic"></i>
      </span>
      </button>
        </p>
      <p className={"control"}>
      <button className={"button is-light is-inverted is-outlined"} onClick={(e) => underlineClicked(e)}>
        <span className="icon is-small">
        <i className="fa fa-underline"></i>
      </span>
      </button>
    </p>
      <p className={"control"}>
      <button className={"button is-light is-inverted is-outlined"} onClick={(e) => codeClicked(e)}>CODE</button>
    </p>
      <p className={"control"}>
      <button className={"button is-light is-inverted is-outlined"} >COLOR</button>
      </p>
    </div>

    </div>
    <div className={'column is-narrow'}>
      <button className={"button is-light is-inverted "} onClick={(e) => docSave(e)}>SAVE</button>
      {/* implement mongo functionality */}
      </div>
  </div>


  );
}
export default Toolbar;
