import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Paper, TextField, Button, CircularProgress } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { logIn, signUp } from './../../../API/index'
import decode from 'jwt-decode'
import SnackbarMessage from '../SnackbarMessage/snackbarMessage'
import { makeStyles } from '@material-ui/core/styles'

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
    // Validating JWT token
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

  // State
  const [isLogin, setIsLogin] = useState(true) // To Form switching
  
  // Login form data
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  })

  // Sign up form data
  const [signUpFormData, setSignUpFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  
  // To store invalid inputs of form data elements to show error message
  const [errorFormData, setErrorFormData] = useState([])
  
  // Error handling state
  const [error, setError] = useState({
    isError: false,
    errorMessage: '',
  })
  
  const [loading, setLoading] = useState(false) // loading animation

  // Snackbar message close
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setError({ isError: false, errorMessage: '' })
  }

  // <--------- Login Form Methods --------->
  const handleLoginChange = (e) => {
    setLoginFormData((loginFormData) => ({
      ...loginFormData,
      [e.target.name]: e.target.value,
    }))
  }

  // Form Validator
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

  // <--------- Sign Up Form Methods --------->
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

  
  // Sign Up Form
  let signUpForm = (
    <form noValidate autoComplete="off">
      {/* Name */}
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

      {/* Email */}
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

      {/* Password */}
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

      {/* Confirm Password */}
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

      {/* Submit Button */}
      <Button
        fullWidth
        className={classes.inputFileds}
        onClick={handleSignUpSubmit}
        variant="contained"
        color="primary"
      >
        Sign Up
      </Button>

      {/* Switch Form Button */}
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

  // Login Form
  let loginForm = (
    <form autoComplete="off" onSubmit={handleLoginSubmit}>
      {/* Email */}
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

      {/* Password */}
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

      {/* Submit Button */}
      <Button
        fullWidth
        className={classes.inputFileds}
        onClick={handleLoginSubmit}
        variant="contained"
        color="primary"
      >
        Login
      </Button>

      {/* Switch Form Button */}
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

      {/* Snackbar Message */}
      <SnackbarMessage
        open={error.isError}
        handleClose={handleClose}
        severity="error"
        message={error.errorMessage}
      />

      {/* Login/SignUp Page */}
      <Grid className={classes.mainContent} container spacing={3}>
        <Paper className={classes.paper}>
          <Grid item sm={12} container className={classes.container}>

            {/* Logo */}
            <Grid item sm={12} className={classes.logo}>
              <AccountCircle
                style={{
                  fontSize: 100,
                  color: '#651fff',
                }}
              />
            </Grid>

            {/* Login/SignUp Form */}
            <Grid item sm={12} container className={classes.form}>
              {/* If isLogin is true then login form will show else sign up form */}
              {isLogin ? loginForm : signUpForm}

              {/* After submit form loading animation */}
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
