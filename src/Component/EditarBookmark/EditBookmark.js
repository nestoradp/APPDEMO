import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useStyle } from "./EditBookmarkStyle";
import validator from "validator/es";
import { useDispatch, useSelector } from "react-redux";
import { SendEditBookmark } from "../../Axios/BookmarksAPI";
import {
  finishLoading,
  removeError,
  setError,
  startLoading,
} from "../../Redux/Action/ActionError";
import { AuthCloseSesion } from "../../Redux/Action/ActionAuth";

export const EditBookmark = ({
  setOpenModalEdit,
  BookmarkEdit,
  data,
  setdata,
}) => {
  const classes = useStyle();
  const [useForm, setuseForm] = useState({
    TipoRecuros: BookmarkEdit.resource.type,
    IDCapitulo: BookmarkEdit.resource.id,
    abstract: BookmarkEdit.abstract,
    path: BookmarkEdit.path,
  });
  const { TipoRecuros, IDCapitulo, abstract, path } = useForm;
  const [ErrorPath, setErrorPath] = useState();
  const [ErrorAbstract, setErrorAbstract] = useState();
  const { tokens } = useSelector((state) => state.UserLogin);
  const dispatch = useDispatch();
//Validaciones
  const ValidatorisPath = () => {
    if (validator.isEmpty(path)) {
      setErrorPath("Campo requerido");
      return false;
    } else {
      setErrorPath(null);
      return true;
    }
  };

  const ValidatorisAbstract = () => {
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
// Funcion para enviar los datos a la Api para editar el Bookmark
  const handleSubmit = () => {
    if (ValidatorisPath() & ValidatorisAbstract()) {
      dispatch(removeError());
      dispatch(startLoading());
      const token = tokens["access-token"];
      const id = BookmarkEdit.id;
      SendEditBookmark(TipoRecuros, id, abstract, path, token)
        .then((response) => {
          const dataNueva = data;
          dataNueva.map((d) => {
            if (d.id === id) {
              d.id = id;
              d.abstract = abstract;
              d.path = path;
            }
          });
          setdata(dataNueva);
          dispatch(finishLoading());
          setOpenModalEdit(false);
        })
        .catch((error) => {
          dispatch(finishLoading());
          const { message } = JSON.parse(error.request.response);
          const status = error.request.status;
          if (status === 403) {
            dispatch(AuthCloseSesion());
          }
          dispatch(setError(message, status));
        });
    }
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
              style={{ borderRadius: "30px" }}
              name="TipoRecuros"
              displayEmpty
              value={TipoRecuros}
              onChange={handleChangeUseForm}
            >
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
              style={{ borderRadius: "30px" }}
              name="IDCapitulo"
              value={IDCapitulo}
              onChange={handleChangeUseForm}
              displayEmpty
            >
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
              style={{ borderRadius: "30px" }}
              variant="outlined"
              margin="normal"
              placeholder="Ej.:12;56"
              name="path"
              value={path}
              onChange={handleChangeUseForm}
              onBlur={ValidatorisPath}
              InputProps={{
                className: classes.input,
              }}
            />
            {ErrorPath && (
              <Grid style={{ marginTop: "5px", marginBlockEnd: "5px" }}>
                <Typography className={classes.MsgError}>
                  {ErrorPath}
                </Typography>
              </Grid>
            )}
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
              style={{ borderRadius: "30px" }}
              multiline
              rows={6}
              variant="outlined"
              value={abstract}
              onChange={handleChangeUseForm}
              onBlur={ValidatorisAbstract}
            />
            {ErrorAbstract && (
              <Grid style={{ marginTop: "10px" }}>
                <Typography className={classes.MsgError}>
                  {ErrorAbstract}
                </Typography>
              </Grid>
            )}
          </FormControl>
          <Box my={2} display="flex" justifyContent="space-around">
            <Button
              className={classes.ButtonEditar}
              variant="contained"
              color="primary"
              onClick={() => setOpenModalEdit(false)}
            >
              Cancelar
            </Button>

            <Button
              className={classes.ButtonEditar}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Editar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
