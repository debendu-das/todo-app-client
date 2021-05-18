import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router'
import { Route } from 'react-router-dom'

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
