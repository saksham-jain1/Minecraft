import React from "react";

const Controller = () => {
  return (
    <div>
      <div className="controls">
        <div  className="left">
          <button id="Space" className="control jump">
            Jump
          </button>
        </div>
        <div className="right">
          <div>
            <button id="ArrowUp" className="control arrow">
              &#x21e7;
            </button>
          </div>
          <div>
            <button id="ArrowLeft" className="control arrow">
              &#x21e6;
            </button>
            <button id="ArrowDown" className="control arrow">
              &#x21e9;
            </button>
            <button id="ArrowRight" className="control arrow">
              &#x21e8;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controller;
