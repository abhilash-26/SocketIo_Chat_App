import React, { useState } from "react";
import Welcome from "./Welcome";
import Home from "./Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  // const [details, setDetails] = useState({
  //   name: "",
  //   room: "",
  // });
  // const location = useLocation();
  // const { details } = location.state;
  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setDetails({ ...details, [e.target.name]: e.target.value });
  // };
  return (
    <div>
      <Router>
        <Route
          exact
          path="/"
          //passing the props using react-router route component
          component={Welcome}
        />
        <Route
          path="/home"
          //passing the props using react-router route component
          component={Home}
        />
      </Router>
    </div>
  );
};

export default App;
