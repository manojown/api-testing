import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import RequestPortal from './RequestPortal';
import Settings from '../pages/Settings';

import History from '../pages/History';


function Header() {
  return (
    <Router>
		<>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
				  to="/"
                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/history/0"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Past Performance
                  </Link>
                  <Link
                    to="/settings"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Settings
                  </Link>
                  {/* 
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>

              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Calendar</a>

              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Reports</a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Testing</h1>
        </div>
      </header> */}
      <Switch>
	  	<Route path="/history/:uid">
          <History />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/">
          <RequestPortal />
        </Route>	
      </Switch>
	  </>
    </Router>
  );
}

export default Header;
