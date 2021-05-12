import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import ToDoTabs from './ToDoTabs/toDoTabs';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(12),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  paper: {
    width: '100%',
    minHeight: '80vh',
  },
  mainContent: {
    width: '100%',
    maxWidth: '700px',
    border: '1px solid black',
  },
  title: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1),
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

const ToDoApp = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.mainContent} container spacing={3}>
        <Paper className={classes.paper}>
          <Grid item sm={12} container className={classes.container}>
            <Grid item sm={12} className={classes.title}>
              <Typography variant="h3" align="center">
                TODO APP
              </Typography>
            </Grid>
            <Grid item sm={12} container>
              <ToDoTabs />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default ToDoApp;
