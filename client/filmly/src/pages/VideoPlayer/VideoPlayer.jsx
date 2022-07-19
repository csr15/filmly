import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import Video from "../../assets/videos/trailer.mp4";
import "./VideoPlayer.css";

function VideoPlayer() {
  const history = useHistory();
  const [showClose, setShowClose] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (showClose) {
        setShowClose(false);
      }
    }, 5000);
  }, [showClose]);

  window.addEventListener("mousemove", () => {
      setShowClose(true)
  });

  return (
    <div className="f_video">
      {showClose && (
        <div className="f_modal_close" onClick={() => history.goBack()}>
          <i className="bx bx-x-circle"></i>
        </div>
      )}
      <video controls autoPlay={true}>
        <source src={Video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>{" "}
    </div>
  );
}

export default VideoPlayer;
