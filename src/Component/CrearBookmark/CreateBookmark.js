import React from 'react';
import {Box, Button, Container, FormControl, Grid, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import {useStyle} from "./CreateBookmarkStyle";

function CreateBookmark(props) {
    const clases = useStyle();

    return (
        <Container maxWidth="sm" className={clases.ContainerPrincipal}>
            <Grid align="center" container>
                <Grid item xs={12} className={clases.GridTitle}>
                    <Typography variant="h4" className={clases.Title}>
                       Crear Marcador
                    </Typography>
                </Grid>

                <Grid align="left" item xs={12} className={clases.GridForm}>

                    <FormControl variant="outlined" className={clases.select}>
                        <label>
                            <Typography align="left" className={clases.type_color} variant="h6">
                              Tipo de Recurso para el Marcador *
                            </Typography>
                        </label>
                        <Select
                            name="Capitulos"
                            displayEmpty
                            style={{borderRadius:'30px'}}
                        >
                            {/*!values.sexo && (
                                <MenuItem value="" disabled>
                                    <div className={classes.select_placeholder}>Seleccione</div>
                                </MenuItem>
                            )*/}
                            <MenuItem value="chapter">Capitulo</MenuItem>

                        </Select>
                        {/*ErrorSexo && (
                            <Grid>
                                <Typography align="left" className={classes.MsgError}>
                                    {ErrorSexo}
                                </Typography>
                            </Grid>
                        )*/}
                    </FormControl>


                    <FormControl variant="outlined" className={clases.select}>
                        <label>
                            <Typography align="left" className={clases.type_color} variant="h6">
                                Capitulos *
                            </Typography>
                        </label>
                        <Select
                            name="Capitulos"
                            displayEmpty
                            style={{borderRadius:'30px'}}
                        >
                            {/*!values.sexo && (
                                <MenuItem value="" disabled>
                                    <div className={classes.select_placeholder}>Seleccione</div>
                                </MenuItem>
                            )*/}
                            <MenuItem value="6165066067980eee183accf1">Capitulo 1</MenuItem>
                            <MenuItem value="613be60465f0f6cf7361f270">Capitulo 2</MenuItem>
                            <MenuItem value="613bda7065f0f6cf7361f252">Capitulo 3</MenuItem>
                            <MenuItem value="613bbe7365f0f6cf7361f1f0">Capitulo 4</MenuItem>
                            <MenuItem value="613b8d6065f0f6cf7361f196">Capitulo 5</MenuItem>
                            <MenuItem value="613b04af65f0f6cf7361f0ee">Capitulo 6</MenuItem>
                            <MenuItem value="61399a0d65f0f6cf7361ef12">Capitulo 7</MenuItem>
                        </Select>
                        {/*ErrorSexo && (
                            <Grid>
                                <Typography align="left" className={classes.MsgError}>
                                    {ErrorSexo}
                                </Typography>
                            </Grid>
                        )*/}
                    </FormControl>




                    <FormControl variant="outlined" fullWidth>
                        <label className={clases.type_color} >Path *</label>
                        <TextField
                            style={{borderRadius:'30px'}}
                            variant="outlined"
                            margin="normal"
                            placeholder="example@gmail.com"
                            name="email"
                            InputProps={{
                                className:clases.input
                            }}
                        />

                    </FormControl>

                    <FormControl variant="outlined" className={clases.select}>
                        <label>
                            <Typography align="left" className={clases.type_color} variant="h6">
                                Abstracto del Capitulo *
                            </Typography>
                        </label>
                        <TextField
                            id="outlined-multiline-static"
                            style={{borderRadius:'30px'}}
                            multiline
                            rows={6}
                            variant="outlined"
                        />
                    </FormControl>
                    <Box
                        my={2}
                        display="flex"
                        justifyContent="center"
                        className={clases.buttons_content}
                    >
                    <Button
                        fullWidth
                        className={clases.ButtonIngresar}
                        variant="contained"
                        color="primary"
                       // onClick={HandleSubmitLogin}
                    >
                        Ingresar
                    </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>

    );
}

export default CreateBookmark;
