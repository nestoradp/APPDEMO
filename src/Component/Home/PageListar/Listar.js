import React, {useEffect} from 'react';
import {Box, Container, Grid, Typography} from "@material-ui/core";
import { useStyle } from "./ListarStyle";
import {useDispatch, useSelector} from "react-redux";
import {finishLoading, setError, startLoading} from "../../../Redux/Action/ActionError";
import {ListDataBookmarks} from "../../../Axios/BookmarksAPI";
import {SalveBookmarksList} from "../../../Redux/Action/ActionBookmarks";




function Listar(props) {
    const clases = useStyle();
   const dispatch = useDispatch();
    const { tokens} = useSelector(state => state.UserLogin);

useEffect(()=>{
   dispatch(startLoading());
   ListDataBookmarks(tokens["access-token"]).then((data)=>{
       dispatch(finishLoading());
       const ListBookMark = data.data;
        dispatch(SalveBookmarksList(ListBookMark));
   }).catch((error)=>{
       dispatch(finishLoading())
       const { message } = JSON.parse(error.request.response);
       dispatch(setError(message));
   })
},[])









    return (
        <Container maxWidth="sm" className={clases.ContainerPrincipal}>
        <Box>
           <Typography>Listado de Marcadores</Typography>








        </Box>
        </Container>

    );
}

export default Listar;