import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import LeftSide from "../components/LeftUI";
import RightSide from "../components/RightUI";
import Grid from "@material-ui/core/Grid";
import HeaderBar from "../components/Header";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "white"
  },
  container: {
    width: 1400
  }
});

export default function MainPage() {


  const classes = useStyles();

  // const getMiddleware = async () => {
  //   const url1 = "/time";
  //   const url2 = "/metrics";
  //   setLeftStage("loading");
  //   setRightStage("loading");
  //   try {
  //     const epochObject = await client._get(url1);
  //     setEpochSeconds(epochObject.data.epoch.properties.epochseconds);
  //     console.log(epochSeconds)
  //     setLeftStage("ready");
  //   } catch (e) {
  //     window.alert("Cannot get requests");
  //   }
  //   try {
  //     const metricsObject = await client._get(url2);
  //     setMetrics(metricsObject);
  //     setRightStage("ready");
  //   } catch (e) {
  //     window.alert("Cannot get requests");
  //   }
  // };

  // useEffect(() => {
  //   getMiddleware();
  //   setInterval(async () => {
  //     await getMiddleware();
  //   }, 30000);
  // }, []);

  return (
    <div className={classes.root}>
      <Container component="main">
        <HeaderBar />
        <Grid container>
          <LeftSide />
          <RightSide/>
        </Grid>
      </Container>
    </div>
  );
}
  
