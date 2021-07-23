import React from "react"
import { Route } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
//mport { NavBar } from "./nav/NavBar"
//import { Login } from "./auth/Login"
//import { Register } from "./auth/Register"

export const R6Planner = () => (
  <>
    <Route
      render={() => {
       // if (sessionStorage.getItem("nutshell_user")) {
          return (
            <>
              <ApplicationViews />
            </>
          )
        } 
       /* else {
          return <Redirect to="/login" />;
        } */
      }
    />

    {/* <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route> */}
  </>
)
