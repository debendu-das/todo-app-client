import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Paper, Grid } from '@material-ui/core'
import ToDoTabs from './ToDoTabs/toDoTabs'
import decode from 'jwt-decode'
import { makeStyles } from '@material-ui/core/styles'

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

  useEffect(() => {
    // Validating JWT token
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
              {/* ToDoTabs containes all the tab informations in the app */}
              <ToDoTabs />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
}

export default ToDoApp
