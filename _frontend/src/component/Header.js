import React, {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import {  clearState   } from "../features/utilitySlice";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";


import AllRoutes from "../helpers/routes";
import image from '../assets/logout.png'
function Header() {
  let [name,setName] = useState("")
  const location = useLocation();
  const logout = () => {
    localStorage.removeItem("token")
    window.location.reload();
  }
  let dispatch = useDispatch()
  
  useEffect(() => {
    var decoded = jwt_decode(localStorage.getItem('token'));
    setName(decoded.email)
  },[])
  const clear = () => {
    console.log("clear stare call")
    dispatch(clearState())
  }
	return (
    <nav className="bg-gray-800">
    <div className="w-4/5 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"/>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
            {RouteBuilder(AllRoutes,location.pathname,clear)}
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="ml-4 flex items-center md:ml-6">
            <button className="bg-gray-800 p-1 text-gray-400 hover:text-white  " onClick={logout}>
              <span className="sr-only">View notifications</span>
                 <img src={image} className="h-7 w-7"/>
            </button>

            <div className="ml-3 relative text-white">
              {name} 
            </div>
          </div>
        </div>
        <div className="-mr-2 flex md:hidden">
          <button type="button" className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
          
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          
            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
			
	);
}

function RouteBuilder(routes,currentPath,clear) {
	return routes.map((route) => (
		<Link key={route.path} to={route.path} className={`${currentPath === route.path? "bg-gray-900" : ''} text-white px-3 py-2 rounded-md text-sm font-medium`}  onClick={() => clear()}>
			{route.name}
		</Link>
	));
}
export default Header;
