
import React from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import FormLogin from "../Component/AuthLogin/FormLogin";
import PrivateRoute from "./PrivateRoute";
import Layaout from "../Component/layaout/Layaout";



function AppRoute(props) {
    return (
         <BrowserRouter>
           <Switch>
               <Route path={'/login'} component={FormLogin} exact />
               <PrivateRoute  path={"/"} compnent={Layaout} exact/>
           </Switch>




         </BrowserRouter>
    );
}

export default AppRoute;