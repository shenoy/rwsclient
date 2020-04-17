import React from "react";
import io from "socket.io-client";
import openSocket from "socket.io-client";


export const CTX = React.createContext();

const initState = {
  java: [
    {
      from: "Arnold",
      msg:
        "Strength does not come from winning. Your struggles develop your strengths."
    },
    {
      from: "Sylvester",
      msg: "Success is usually the culmination of controlling failure."
    }
  ],

  python: [
    {
      from: "Jesus",
      msg: "All my authority in heaven and on earth has been given to me."
    },
    {
      from: "Friedrich",
      msg:
        "To live is to suffer, to survive is to find some meaning in the suffering."
    }
  ]
};

function reducer(state, action) {
  const { from, msg, topic } = action.payload;
  console.log(state, "state");
  console.log(action.payload, "action payload");
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [...state[topic], { from, msg }]
      };

    default:
      return state;
  }
}

let socket;

function sendChatAction(value) {
  console.log(value, "value in sendchat emitter");
  socket.emit("chat message", value);
}

export default function Store(props) {
  const [allChats, dispatch] = React.useReducer(reducer, initState);
  if (!socket) {
    // socket = io(":8000");
    socket = openSocket(`https://reactwschat.herokuapp.com/`);
    socket.on("chat message", function(msg) {
      console.log(msg, "socket received message");
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }

  const user = "user" + Math.random(100).toFixed(2);

  return (
    <CTX.Provider value={[allChats, sendChatAction, user]}>
      {props.children}
    </CTX.Provider>
  );
}
