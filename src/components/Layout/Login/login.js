import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { TextField, Button, CircularProgress } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { logIn, signUp } from './../../../API/index'
import { useHistory } from 'react-router'
import decode from 'jwt-decode'
import SnackbarMessage from '../SnackbarMessage/snackbarMessage'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(12),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(5),
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
    maxWidth: '650px',
  },
  logo: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1),
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  form: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    marginBottom: theme.spacing(5),
    maxWidth: '400px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formGrid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputFileds: {
    marginBottom: theme.spacing(1),
  },
}))
const Login = () => {
  const classes = useStyles()
  const history = useHistory()

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user'))?.token
    if (token) {
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        localStorage.clear()
      } else {
        history.push('/')
      }
    }
  }, [history])

  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  })
  const [signUpFormData, setSignUpFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errorFormData, setErrorFormData] = useState([])

  const [error, setError] = useState({
    isError: false,
    errorMessage: '',
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setError({ isError: false, errorMessage: '' })
  }

  const handleLoginChange = (e) => {
    setLoginFormData((loginFormData) => ({
      ...loginFormData,
      [e.target.name]: e.target.value,
    }))
  }

  const formValidator = (formData) => {
    const expressions = {
      name: /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/,
      email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      confirmPassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    }
    let errors = []
    for (let [key, value] of Object.entries(formData)) {
      !expressions[key].test(String(value).toLowerCase()) && errors.push(key)
    }
    setErrorFormData(errors)

    return errors
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault()

    const errors = formValidator(loginFormData)

    if (errors.length > 0) {
      return
    }
    setLoading(true)
    try {
      const { data } = await logIn(loginFormData)
      localStorage.setItem('user', JSON.stringify(data))
      setLoading(false)
      history.push('/')
    } catch (error) {
      setLoading(false)
      if (error.response && error.response.data) {
        setError({ isError: true, errorMessage: error.response.data.message })
      }
    }
  }

  const handleSignUpChange = (e) => {
    setSignUpFormData((signUpFormData) => ({
      ...signUpFormData,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSignUpSubmit = async (event) => {
    event.preventDefault()

    const errors = formValidator(signUpFormData)

    if (errors.length > 0) {
      return
    }

    setLoading(true)

    try {
      const { data } = await signUp(signUpFormData)
      localStorage.setItem('user', JSON.stringify(data))
      setLoading(false)
      history.push('/')
    } catch (error) {
      setLoading(false)
      if (error.response && error.response.data) {
        setError({ isError: true, errorMessage: error.response.data.message })
      }
    }
  }

  const hasError = (key) => {
    return errorFormData.indexOf(key) !== -1
  }

  let signUpForm = (
    <form noValidate autoComplete="off">
      <TextField
        fullWidth
        className={classes.inputFileds}
        label="Name"
        variant="outlined"
        name="name"
        onChange={handleSignUpChange}
        value={signUpFormData.name}
        error={hasError('name')}
        helperText={hasError('name') && 'Name is required !'}
      />
      <TextField
        fullWidth
        className={classes.inputFileds}
        label="Email"
        variant="outlined"
        name="email"
        type="email"
        onChange={handleSignUpChange}
        value={signUpFormData.email}
        error={hasError('email')}
        helperText={hasError('email') && 'Invalid Email !'}
      />
      <TextField
        fullWidth
        className={classes.inputFileds}
        label="Password"
        variant="outlined"
        name="password"
        type="password"
        onChange={handleSignUpChange}
        value={signUpFormData.password}
        error={hasError('password')}
        helperText={
          hasError('password') &&
          'Password needs minimum eight characters, and at least one number ! (Example: abcdefg8)'
        }
      />
      <TextField
        fullWidth
        className={classes.inputFileds}
        label="Confirm Password"
        variant="outlined"
        name="confirmPassword"
        type="password"
        onChange={handleSignUpChange}
        value={signUpFormData.confirmPassword}
        error={hasError('confirmPassword')}
        helperText={
          hasError('confirmPassword') &&
          'Password needs minimum eight characters, and at least one number ! (Example: abcdefg8)'
        }
      />
      <Button
        fullWidth
        className={classes.inputFileds}
        onClick={handleSignUpSubmit}
        variant="contained"
        color="primary"
      >
        Sign Up
      </Button>
      <Button
        fullWidth
        className={classes.inputFileds}
        onClick={() => setIsLogin((isLogin) => !isLogin)}
        variant="contained"
        color="secondary"
      >
        Already Have An Account ? Login
      </Button>
    </form>
  )

  let loginForm = (
    <form autoComplete="off" onSubmit={handleLoginSubmit}>
      <TextField
        label="Email"
        variant="outlined"
        name="email"
        fullWidth
        className={classes.inputFileds}
        onChange={handleLoginChange}
        value={loginFormData.email}
        error={hasError('email')}
        helperText={hasError('email') && 'Invalid Email !'}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        name="password"
        fullWidth
        className={classes.inputFileds}
        onChange={handleLoginChange}
        value={loginFormData.password}
        error={hasError('password')}
        helperText={
          hasError('password') &&
          'Password needs minimum eight characters, and at least one number ! (Example: abcdefg8)'
        }
      />
      <Button
        fullWidth
        className={classes.inputFileds}
        onClick={handleLoginSubmit}
        variant="contained"
        color="primary"
      >
        Login
      </Button>
      <Button
        fullWidth
        className={classes.inputFileds}
        onClick={() => setIsLogin((isLogin) => !isLogin)}
        variant="contained"
        color="secondary"
      >
        Create New Account
      </Button>
    </form>
  )

  return (
    <div className={classes.root}>
      <SnackbarMessage
        open={error.isError}
        handleClose={handleClose}
        severity="error"
        message={error.errorMessage}
      />
      <Grid className={classes.mainContent} container spacing={3}>
        <Paper className={classes.paper}>
          <Grid item sm={12} container className={classes.container}>
            <Grid item sm={12} className={classes.logo}>
              <AccountCircle
                style={{
                  fontSize: 100,
                  color: '#651fff',
                }}
              />
            </Grid>
            <Grid item sm={12} container className={classes.form}>
              {isLogin ? loginForm : signUpForm}
              {loading && (
                <CircularProgress
                  style={{
                    fontSize: 100,
                    color: '#651fff',
                    marginTop: '10%',
                  }}
                />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
}

export default Login
