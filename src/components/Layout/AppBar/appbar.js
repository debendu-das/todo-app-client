import React from 'react'
import { useHistory } from 'react-router-dom'
import {AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function ButtonAppBar() {
  const classes = useStyles()
  const history = useHistory()
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            TODO APP
          </Typography>
          <Route exact path="/">
            <Button
              color="inherit"
              onClick={() => {
                localStorage.clear()
                history.push('/login')
              }}
            >
              Logout
            </Button>
          </Route>
        </Toolbar>
      </AppBar>
    </div>
  )
}
