import React from "react";

import "./Backdrop.css";

function Backdrop(props) {
  const { height, width } = props;
  return (
    <div className="f_backdrop">
      <div
        className="f_backdrop_container"
        style={{
          height: height ? height : "90%",
          width: width ? width : "60%",
        }}
      >
        {props.children}
      </div>
    </div>
  );
}

export default Backdrop;
