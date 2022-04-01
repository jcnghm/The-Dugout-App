import React, { useState } from "react";
import {
  Drawer as MUIDrawer,
  Theme,
  useTheme,
  makeStyles,
  createStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import {
  RouteComponentProps,
  withRouter,
  Switch,
  Route,
} from "react-router-dom";
import { ChatTable, ChatForm } from "../../components";
import { NavBar } from "../../components";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    tablesize: {
      width: "70%",
      marginLeft: "15%",
    },
    main: {
      backgroundColor: "#d08c60",
      backgroundImage: `linear-gradient(to bottom right, #b08968, #582f0e);`,
      width: "100%",
      height: "100%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      position: "absolute",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    toolbar: {
      display: "flex",
    },
    toolbar_button: {
      marginLeft: "15%",
    },
  })
);

interface DashProps {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

export const Profile = withRouter((props: DashProps) => {
  console.log(props);
  const { history } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClickOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClickClose = () => {
    setDialogOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <div>
          <NavBar />
        </div>
        <br />
        <div>
          <Button
            className={classes.toolbar_button}
            variant="contained"
            onClick={handleDialogClickOpen}
          >
            Add Player
          </Button>
          <br />
          <br />
          <Dialog
            open={dialogOpen}
            onClose={handleDialogClickClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add Player</DialogTitle>
            <DialogContent>
              <DialogContentText>Place Player Info Here</DialogContentText>
              <ChatForm />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClickClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className={classes.tablesize}>
          <ChatTable />
        </div>
      </div>
    </div>
  );
});
