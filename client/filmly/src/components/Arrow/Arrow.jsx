import { VisibilityContext } from "react-horizontal-scrolling-menu";
import React from "react";

function Arrow({ className, icon, styles }) {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <div
      disabled={isLastItemVisible}
      className={`f_chevron_icon ${className}`}
      onClick={() => scrollNext()}
      style={styles}
    >
      <i className={`bx ${icon}`}></i>
    </div>
  );
}

export default Arrow;
