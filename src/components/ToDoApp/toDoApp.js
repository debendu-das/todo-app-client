import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ToDoTabs from './ToDoTabs/toDoTabs'

import decode from 'jwt-decode'
import { useEffect } from 'react'
import { useHistory } from 'react-router'

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
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
}))

const ToDoApp = () => {
  const classes = useStyles()
  const history = useHistory()
  // const location = useLocation()

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user'))?.token
    if (token) {
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        localStorage.clear()
        history.push('/login')
      } else {
        history.push('/')
      }
    } else {
      history.push('/login')
    }
  }, [history])
  return (
    <div className={classes.root}>
      <Grid className={classes.mainContent} container spacing={3}>
        <Paper className={classes.paper}>
          <Grid item sm={12} container className={classes.container}>
            <Grid item sm={12} container>
              <ToDoTabs />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
}

export default ToDoApp
