import {Box, Button, Container, FormControl, Grid, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import React, {useRef, useState} from "react";
import {useStyle} from "./EditBookmarkStyle";
import validator from "validator/es";

const InitialValue = {
    "TipoRecuros ": "",
    IDCapitulo: "",
    abstract:""
};



export const EditBookmark =({
                                setOpenModalEdit,
                                BookmarkEdit
                          }) => {
 const classes = useStyle();
    const pathRef = useRef();
    const abstractRef = useRef();
    const [useForm, setuseForm] = useState(InitialValue);
    const { TipoRecuros, IDCapitulo,abstract } = useForm;
    const [ErrorPath, setErrorPath] = useState();
    const [ErrorAbstract, setErrorAbstract] = useState();


    const ValidatorisPath = () => {
        const path = pathRef.current.value;
        if (validator.isEmpty(path)) {
            setErrorPath("Campo requerido");
            return false;
        } else {
            setErrorPath(null);
            return true;
        }
    };

    const ValidatorisAbstract = () => {
        const abstract = abstractRef.current.value;
        console.log(abstract);
        if (validator.isEmpty(abstract)) {
            setErrorAbstract("Campo requerido");
            return false;
        } else {
            setErrorAbstract(null);
            return true;
        }
    };
    const handleChangeUseForm = (event) => {
        const InputChange = {
            ...useForm,
            [event.target.name]: event.target.value,
        };
        setuseForm(InputChange);
    };

    return (
        <Container maxWidth="sm" className={classes.ContainerModal}>
            <Grid align="center" container>
                <Grid item xs={12} className={classes.GridTitle}>
                    <Typography variant="h4">Crear Marcador</Typography>
                </Grid>

                <Grid align="left" item xs={12} className={classes.GridForm}>
                    <FormControl variant="outlined" className={classes.select}>
                        <label>
                            <Typography
                                align="left"
                                className={classes.type_color}
                                variant="h6"
                            >
                                Tipo de Recurso para el Marcador *
                            </Typography>
                        </label>
                        <Select
                            style={{borderRadius: "30px"}}
                            name="TipoRecuros"
                            displayEmpty
                            value={BookmarkEdit.resource.type}
                            // onChange={handleChangeUseForm}
                        >
                            {/*!TipoRecuros && (
                    <MenuItem value="" disabled>
                      <div className={classes.select_placeholder}>Seleccione</div>
                    </MenuItem>
                )*/}
                            <MenuItem value="chapter">Capitulo</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" className={classes.select}>
                        <label>
                            <Typography
                                align="left"
                                className={classes.type_color}
                                variant="h6"
                            >
                                Capitulos *
                            </Typography>
                        </label>
                        <Select
                            style={{borderRadius: "30px"}}
                            name="IDCapitulo"
                              value={BookmarkEdit.resource.id}
                              onChange={handleChangeUseForm}
                            displayEmpty
                        >
                            {/*!IDCapitulo && (
                    <MenuItem value="" disabled>
                      <div className={clases.select_placeholder}>Seleccione</div>
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
                    </FormControl>

                    <FormControl variant="outlined" fullWidth>
                        <label className={classes.type_color}>Path *</label>
                        <TextField
                            style={{borderRadius: "30px"}}
                            variant="outlined"
                            margin="normal"
                            placeholder="Ej.:12;56"
                            name="path"
                            InputProps={{
                                className: classes.input,
                            }}
                        />
                    </FormControl>

                    <FormControl variant="outlined" className={classes.select}>
                        <label>
                            <Typography
                                align="left"
                                className={classes.type_color}
                                variant="h6"
                            >
                                Abstracto del Capitulo *
                            </Typography>
                        </label>
                        <TextField
                            id="outlined-multiline-static"
                            name="abstract"
                            style={{borderRadius: "30px"}}
                            multiline
                            inputRef={abstractRef}
                            rows={6}
                            variant="outlined"
                         //   defaultValue={ BookmarkEdit.abstract}
                            value={BookmarkEdit.abstract}
                          //  onChange={handleChangeUseForm}
                            onBlur={ValidatorisAbstract}
                        />
                    </FormControl>
                    <Box
                        my={2}
                        display="flex"
                        justifyContent="space-around"


                    >
                        <Button
                            className={classes.ButtonEditar}
                            variant="contained"
                            color="primary"
                            onClick={()=>setOpenModalEdit(false)}
                        >
                            Cancelar
                        </Button>

                        <Button
                            className={classes.ButtonEditar}
                            variant="contained"
                            color="primary"
                          //  onClick={DeleteBookmark}
                        >
                            Editar
                        </Button>

                    </Box>

                </Grid>
            </Grid>
        </Container>


    )

}