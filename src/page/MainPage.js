import React from "react";
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
  
