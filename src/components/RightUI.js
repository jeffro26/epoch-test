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
    overflow: "scroll",
    backgroundColor: "#263238",
    maxHeight:900,
    width:600
  },
  name:{
    color:"white",
    fontWeight: "bold"
  }
});

export default function RightSide(props) {
  const [rightStage, setRightStage] = useState("loading");
  const [metrics, setMetrics] = useState();
  const classes = useStyles(props);

    const getMiddleware = async () => {
    const url = "/metrics";
    setRightStage("loading");
    try {
      const metricsObject = await client._get(url);
      setMetrics(metricsObject);
      setRightStage("ready");
    } catch (e) {
      window.alert("Cannot get metrics data");
    }
  };

  useEffect(() => {
    getMiddleware();
    setInterval(() => {
      getMiddleware();
    }, 30000);
  }, []);

  const renderReady = () => (
    <div className={classes.root}>
      <Container component="main">
        <Grid container>
            <ListItem>
              <ListItemText
                classes={{ root: classes.name }}
                primary={` ${metrics}`}
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
  if (rightStage === "ready") {
    content = renderReady();
  } else {
    content = renderLoading();
  }

  return content;
}

