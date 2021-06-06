import { useState, useEffect } from "react";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import "./app.css";
import { useLocation, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const PORT = "http://localhost:8000";

const socket = io.connect(PORT);

function App() {
  const location = useLocation();
  const history = useHistory();
  const { details } = location.state;
  const [state, setState] = useState({
    message: "",
    name: details.name,
    room: details.room,
    userId: uuidv4(),
  });

  const [chat, setChat] = useState([]);
  // const [leftChat, setLeftChat] = useState([]);
  const [userName, setUserName] = useState();
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    socket.emit(
      "join",
      { room: details.room, name: details.name, userId: state.userId },
      ({ error }) => {
        setErrors(error);
      }
    );

    // socket.on("joinmessage", ({ user, text }) => {
    //   setText(text);
    // });

    // socket.on("left", (id, users) => {
    //   setLeftChat(`${id} left the chat`);
    //   setUsers(users);
    // });
  }, []);

  // const getAllMessage = (text) => {
  //   return text.map((item) => item);
  // };

  useEffect(() => {
    socket.on("message", ({ text, user }) => {
      console.log(text);
      setChat([...chat, text]);
      setUserName(user);

      // console.log(userName);
    });
  }, [chat]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { message } = state;
    socket.emit("sendMessage", { message });
    setState({ message: "" });
  };

  return (
    <div>
      {errors && history.push("/")}
      {!errors && (
        <div className="card">
          <div className="chat_nav_container">
            <div className="render-chat">
              <h1>Chat Log</h1>
              {chat.map((item, index) => {
                return (
                  <div
                    // className={`box${
                    //   state.name === { userName } ? "right" : "left"
                    // }`}
                    key={index}
                  >
                    <h2>{item}</h2>

                    {/* <p>-{item.name}</p> */}
                  </div>
                );
              })}
              {/* {leftChat && <p>{leftChat}</p>} */}
            </div>
          </div>
          <form onSubmit={onMessageSubmit}>
            <div>
              <TextField
                name="message"
                onChange={handleChange}
                value={state.message}
                id="outlined-multiline-static"
                variant="outlined"
                label="message"
              />
            </div>
            <button>send message</button>
          </form>
          {/* {!errors && <p>hi</p>} */}
          {/* <p>{text}</p> */}
        </div>
      )}
    </div>
  );
}

export default App;
