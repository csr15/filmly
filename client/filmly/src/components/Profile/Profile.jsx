import React from "react";
import { useHistory } from "react-router";

import CustomAvatar from "../Avatar/Avatar";

import "./Profile.css";

function Profile({ title, occupation, id }) {
  const history = useHistory();

  return (
    <div
      className="f_profile"
      onClick={() => history.push(`/list/${occupation.toLowerCase()}/${id}`)}
    >
      <div className="f_profile_header">
        <CustomAvatar />
      </div>
      <div className="f_profile_body">
        <h6>{title}</h6>
      </div>
      <div className="f_profile_footer">
        <p>{occupation}</p>
      </div>
    </div>
  );
}

export default Profile;
