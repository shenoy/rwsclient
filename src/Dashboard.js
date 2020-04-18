import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { CTX } from "./Store";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    background: "linear-gradient(45deg, #34495E 30%, #283747 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 800,
    margin: "50px",
    padding: theme.spacing(3, 2)
  },
  margin: {
    margin: theme.spacing(1)
  },
  flex: {
    display: "flex",
    alignItems: "center"
  },

  topicsWindow: {
    width: "30%",
    height: "600px",
    borderRight: "1px solid grey"
  },
  chatWindow: { width: "70%", height: "500px", padding: "20px" },

  chatBox: { width: "85%" },
  button: { width: "15%" }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [allChats, sendChatAction, user] = React.useContext(CTX);
  const topics = Object.keys(allChats);
  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
  const [textValue, changeTextValue] = React.useState("");

  return (
      <Paper className={classes.root} elevation={3}>

        <Typography variant="h4" component="h4">
          React Websocket Chat
      </Typography>
        <Typography variant="h5" component="h5">
          Channel: {activeTopic}
        </Typography>


        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {topics.map(el => (
                <ListItem
                  onClick={e => changeActiveTopic(e.target.innerText)}
                  key={el}
                  button
                >
                  <ListItemText primary={el} />
                </ListItem>
              ))}
            </List>
          </div>

          <div className={classes.chatWindow}>
            {allChats[activeTopic].map((e, i) => (
              <div className={classes.flex} key={i}>
                <Chip label={e.from} className={classes.chip} />
                <div>{e.msg}</div>
              </div>
            ))}
          </div>
        </div>


        <div className={classes.flex}>
          <TextField
            label="Send a chat"
            value={textValue}
            onChange={e => changeTextValue(e.target.value)}
            className={classes.chatBox}
          />
          </div>

        <Button onClick={() => {
          sendChatAction({ from: user, msg: textValue, topic: activeTopic });
          changeTextValue("");
        }}>
          Send Chat
        </Button>
      </Paper>
  );
}
