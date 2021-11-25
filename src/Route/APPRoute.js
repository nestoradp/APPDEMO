
import React from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import FormLogin from "../Component/AuthLogin/FormLogin";
import PrivateRoute from "./PrivateRoute";
import Layaout from "../Component/layaout/Layaout";
import Listar from "../Component/Home/PageListar/Listar";
import Home from "../Component/Home/Home";
import CreateBookmark from "../Component/CrearBookmark/CreateBookmark";



function AppRoute(props) {
    return (
         <BrowserRouter>
           <Switch>
               <Route path={'/login'} component={FormLogin} exact />
                 <Layaout>
                     <PrivateRoute  path={"/"} compnent={Home} exact/>
               <PrivateRoute  path={"/list"} compnent={Listar} exact/>
                     <PrivateRoute  path={"/create"} compnent={CreateBookmark} exact/>
                 </Layaout>

           </Switch>




         </BrowserRouter>
    );
}

export default AppRoute;