import React from "react";

import "./AuthBackdrop.css";

function AuthBackdrop(props) {
  return (
    <div className="auth">
      <div className="row">
        <div className="col-md-12">{props.children}</div>
      </div>
    </div>
  );
}

export default AuthBackdrop;
