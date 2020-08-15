import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { ListItem, ListItemText } from "@material-ui/core";
import CircleLoadAnimation from "./LoadingCircle";
import client from "../api/ApiClient";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "#263238",
    minHeight: 600,
    width: 600
  },
  name: {
    color: "white",
    fontWeight: "bold"
  }
});

export default function LeftSide(props) {
  const [localSeconds, setLocalSeconds] = useState("00:00:00");
  const classes = useStyles(props);
  const [epochSeconds, setEpochSeconds] = useState();
  const [leftStage, setLeftStage] = useState("loading");

  const getMiddleware = async () => {
    const url = "/time";
    setLeftStage("loading");
    try {
      const epochObject = await client._get(url);
      setEpochSeconds(epochObject.data.epoch.properties.epochseconds);
      console.log(epochSeconds)
      setLeftStage("ready");
    } catch (e) {
      window.alert("Cannot get time request");
    }
  };

  useEffect(() => {
    getMiddleware();
    setInterval(async () => {
      await getMiddleware();
    }, 30000);
  }, []);

  const eDifference = () => {
    const localTime = Math.floor(Date.now() / 1000);

    const difference = localTime - epochSeconds;
    var formattedNumber = ("0" + difference).slice(-2);
    const timeD = `00:00:${formattedNumber}`;
    console.log(timeD);
    if (typeof timeD === "undefined") {
      setLocalSeconds("00:00:00");
    } else {
      setLocalSeconds(timeD);
    }
  };

  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      eDifference();
    }, 1000);
    return () => clearInterval(interval);
  }, [eDifference]);

  const renderReady = () => (
    <div className={classes.root}>
      <Container component="main">
        <Grid container>
            <ListItem>
              <ListItemText
                classes={{ root: classes.name }}
                primary={`Epoch Seconds: ${epochSeconds}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                classes={{ root: classes.name }}
                primary={`Difference In Time : ${localSeconds}`}
              />
            </ListItem>
          </Grid>
      </Container>
    </div>
  );

  const renderLoading = () => (
    <div className={classes.root}>
      <Container component="main">
        <CircleLoadAnimation />
      </Container>
    </div>
  );

  let content;
  if (leftStage === "ready") {
    content = renderReady();
  } else {
    content = renderLoading();
  }

  return content;
}
