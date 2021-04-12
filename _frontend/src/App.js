import './App.css';
import Login from './component/Login'
import Home from './component/Request/home'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './component/Register'
import { PrivateRoute } from './helpers/privateRouting';
import  { Toaster } from "react-hot-toast";
import Performance from './component/Performance';
import Servers from './component/Server';
import Download from './component/Download';
import Dashboard from './component/Dashboard';
import Report from './component/Report';





function App() {
  return (
    <div className="App flex flex-column justify-center items-center h-screen bg-gray-200 ">
      <Toaster/>
      <Router>
        <Switch>
          <Route exact component={Login} path="/login" />
          <Route exact component={Register} path="/signup" />
          <PrivateRoute exact component={Home} path="/request" />
          <PrivateRoute exact component={Dashboard} path="/" />
          <PrivateRoute exact component={Performance} path="/performace" />
          <PrivateRoute exact component={Servers} path="/server" />
          <PrivateRoute exact component={Download} path="/download" />
          <PrivateRoute exact component={Report} path="/report" />

        </Switch>
      </Router>
    </div>

  );
}

export default App;
