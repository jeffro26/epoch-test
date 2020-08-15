import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import TimelapseIcon from "@material-ui/icons/Timelapse";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth:1200,
    
  },
  Bar: {
    backgroundColor: "#311b92"
  },

  icon: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function HeaderBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.Bar}>
        <Toolbar>
          <Icon
            edge="start"
            className={classes.icon}
            color="inherit"
            aria-label="menu"
          >
            <TimelapseIcon />
          </Icon>
          <Typography variant="h6" className={classes.title}>
            Epoch Site
          </Typography>
        </Toolbar>

      </AppBar>
    </div>
  );
}
