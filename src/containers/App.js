import './App.css';
import AppBar from '../components/Layout/AppBar/appbar';
import Login from '../components/Layout/Login/login';
import ToDoApp from '../components/ToDoApp/toDoApp';
import { useState } from 'react';

const App = () => {
  const [login] = useState(true);

  return (
    <div className="App">
      <AppBar />
      {login ? <ToDoApp /> : <Login />}
    </div>
  );
};

export default App;
