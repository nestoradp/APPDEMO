import React from 'react';
import {useSelector} from "react-redux";
import {Route,Redirect} from "react-router-dom";

function PrivateRoute({compnent:Component, ...rest}) {
   const { AuthUser} = useSelector(state => state.UserLogin);
    return (
        <>
       <Route {...rest}>
           {AuthUser?
              <Component/>
             :<Redirect to={'/login'}/>
           }
       </Route>
        </>
    );
}

export default PrivateRoute;