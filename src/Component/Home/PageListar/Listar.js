import React, {useEffect, useState} from 'react';
import {Box, Container, Grid, Typography} from "@material-ui/core";
import { useStyle } from "./ListarStyle";
import {useDispatch, useSelector} from "react-redux";
import {finishLoading, setError, startLoading} from "../../../Redux/Action/ActionError";
import {ListDataBookmarks} from "../../../Axios/BookmarksAPI";
import {SalveBookmarksList} from "../../../Redux/Action/ActionBookmarks";
import MaterialTable from "material-table";
import DataTable from "./DataTable/DataTable";
import DataTableProp from "./DataTable/DataTableProp";


function Listar(props) {
    const clases = useStyle();
   const dispatch = useDispatch();
    const { tokens} = useSelector(state => state.UserLogin);
    const [LBookmark, setLBookmark]= useState(null);
 //   const { } = useSelector( state => state.List )

useEffect(()=>{
   dispatch(startLoading());
   ListDataBookmarks(tokens["access-token"]).then((data)=>{
       dispatch(finishLoading());
       setLBookmark(data.data)
      // const ListBookMark = data.data;
      // dispatch(SalveBookmarksList(ListBookMark));
   }).catch((error)=>{
       dispatch(finishLoading())
       const { message } = JSON.parse(error.request.response);
       dispatch(setError(message));
   })
},[])


const columnas=[
    {title:'ID',
      field:'id'
    },

    {title:'Abstract',
        field:'abstract'
    },

    {title:'Path',
        field:'path'
    },

    {title:'Time',
        field:'time'
    },

    {title:'Author',
        field:'author'
    },

]

/*const data=[
    LBookmark.map((Bookmark, index)=>(


       {id: Bookmark.id, abstract: Bookmark.abstract, path:Bookmark.path, time: Bookmark.time, author:Bookmark.path }

    ))
]*/



    return (
        <Box  className={clases.ContainerPrincipal}>
            {LBookmark && (
            <Box style={{marginTop:"20px"}}>
           <Typography align="center">Listado de Marcadores</Typography>

                { /*<Box >
               <DataTable data={LBookmark}/>
             </Box>*/}
                <Box >
                    <DataTableProp data={LBookmark}/>
                </Box>

        </Box>

            )}




        </Box>

    );
}

export default Listar;