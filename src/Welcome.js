import React from "react";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { useState } from "react";

const Welcome = () => {
  const [details, setDetails] = useState({
    name: "",
    room: "",
  });
  const handleName = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <TextField
        name="name"
        value={details.name}
        onChange={handleName}
        placeholder="enter your name"
      />
      <TextField
        name="room"
        value={details.room}
        onChange={handleName}
        placeholder="enter room name..."
      />
      <Link to={{ pathname: "/home", state: { details } }}>
        <button>proceed...</button>
      </Link>
    </div>
  );
};

export default Welcome;
