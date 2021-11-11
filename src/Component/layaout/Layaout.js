import {Box} from "@material-ui/core";
import React from "react";
import MenuBar from "../AppBar/MenuBar";
import Footer from "./Footer/Footer";


function Layaout( {children}) {
    return (
        <Box display={'flex'} flexDirection={'column'} height={'100vh'} justifyContent={'space-between'}>
            <MenuBar/>
            <Box>
                {children}


            </Box>

              <Footer/>

        </Box>
    );
}

export default Layaout;