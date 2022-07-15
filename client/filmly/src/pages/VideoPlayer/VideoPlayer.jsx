import React from "react";

import Video from "../../assets/videos/trailer.mp4";
import "./VideoPlayer.css"

function VideoPlayer() {
  return (
    <div className="f_video">
      <video controls autoPlay={true}>
        <source src={Video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>{" "}
    </div>
  );
}

export default VideoPlayer;
