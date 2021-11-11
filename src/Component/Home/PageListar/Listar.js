import React from 'react';
import {Box, Container, Grid, Typography} from "@material-ui/core";
import { useStyle } from "./ListarStyle";




function Listar(props) {
    const clases = useStyle();











    return (
        <Container maxWidth="sm" className={clases.ContainerPrincipal}>
        <Box>
           <Typography>Listado de Marcadores</Typography>








        </Box>
        </Container>

    );
}

export default Listar;