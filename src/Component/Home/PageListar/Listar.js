import React, { useEffect, useState } from "react";
import {Backdrop, Box, CircularProgress, Container, Grid, Typography} from "@material-ui/core";
import { useStyle } from "./ListarStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  finishLoading, removeError,
  setError,
  startLoading,
} from "../../../Redux/Action/ActionError";
import { ListDataBookmarks } from "../../../Axios/BookmarksAPI";
import DataTableProp from "./DataTable/DataTableProp";
import {Alert, AlertTitle} from "@material-ui/lab";
import {RemoveRequestDataForm} from "../../../Redux/Action/ActionFormBookmark";

function Listar(props) {
  const clases = useStyle();
  const dispatch = useDispatch();
  const { tokens } = useSelector((state) => state.UserLogin);
  const { id } = useSelector((state) => state.Requestdata);
  const { loading, msgError } = useSelector((state) => state.UIError);
  const [LBookmark, setLBookmark] = useState(null);
  //   const { } = useSelector( state => state.List )

  useEffect(() => {
    dispatch(startLoading());
    ListDataBookmarks(tokens["access-token"])
      .then((data) => {
        dispatch(finishLoading());
        setLBookmark(data.data);
      })
      .catch((error) => {
        dispatch(finishLoading());
       const { message } = JSON.parse(error.request.response);
       dispatch(setError(message));
      });
  }, []);

  const EliminarErroresRedux=()=>{
    setTimeout(() => {
      dispatch(RemoveRequestDataForm());
    }, 2000);
  }

  return (
    <Box className={clases.ContainerPrincipal}>
      {LBookmark ? (
        <Box style={{ marginTop: "20px" }}>
          <Typography align="center">Listado de Marcadores</Typography>
           <Box>
            <DataTableProp
                data={LBookmark}
               setdata={setLBookmark}
            />
          </Box>

        </Box>
      ):(

          <Backdrop className={clases.backdrop} open={loading}>
            <CircularProgress size={100} color="inherit" />
          </Backdrop>

      )}

      {msgError &&(
          <Alert severity="error">
            <AlertTitle>{msgError}</AlertTitle>
          </Alert>
      )}

      {id &&(
          <Box className={clases.send_support}>
            <Alert severity="success">
              {id && <AlertTitle>Marcador Creado</AlertTitle>}
            </Alert>
          </Box>
      )}
      {id ? EliminarErroresRedux() : ""}
    </Box>
  );
}

export default Listar;
