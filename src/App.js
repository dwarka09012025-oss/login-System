import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './components/Home';
import Navbar from './components/Navbar'; // Navbar import karein

function App() {

  const inAuth = localStorage.getItem("isAuth") === "true";
  const username = localStorage.getItem("username");

  return (
    <Router>
      {/* Navbar ko Switch se bahar rakha hai taaki ye hamesha dikhe */}
      <Navbar />

      <Switch>
        <Route path="/register">
          <Register />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route exact path="/">
          {inAuth ? (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h1>Welcome, {username}!</h1>
              <p>You have successfully logged in.</p>
            </div>
          ) : (
            <Home />
          )}
        </Route>

        {/* <Route path="*">
          <h1 style={{ textAlign: 'center' }}>404 - Not Found</h1>
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;