import './App.css'
import AppBar from '../components/Layout/AppBar/appbar'
import ToDoApp from '../components/ToDoApp/toDoApp'
import Login from './../components/Layout/Login/login'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/">
            <ToDoApp />
          </Route>
        </Switch>
        <AppBar />
      </BrowserRouter>
    </div>
  )
}

export default App
