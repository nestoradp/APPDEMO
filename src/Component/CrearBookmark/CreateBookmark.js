import { useRef, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import {Redirect, useHistory} from "react-router";
import { useStyle } from "./CreateBookmarkStyle";
import validator from "validator/es";
import { useDispatch, useSelector } from "react-redux";
import { SendDataFormCreateBookmark } from "../../Redux/Action/ActionFormBookmark";
import {Link} from "react-router-dom";
import {Alert, AlertTitle} from "@material-ui/lab";
import {removeError} from "../../Redux/Action/ActionError";

const InitialValue = {
  "TipoRecuros ": "",
  IDCapitulo: "",
};

function CreateBookmark() {
  const clases = useStyle();
  const pathRef = useRef();
  const abstractRef = useRef();
  const [useForm, setuseForm] = useState(InitialValue);
  const { TipoRecuros, IDCapitulo } = useForm;
  const [ErrorPath, setErrorPath] = useState();
  const [ErrorAbstract, setErrorAbstract] = useState();
  const { tokens } = useSelector((state) => state.UserLogin);
  const { loading, msgError } = useSelector((state) => state.UIError);
  const { id } = useSelector((state) => state.Requestdata);
  const dispatch = useDispatch();
  const history = useHistory();

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
    if (validator.isEmpty(abstract)) {
      setErrorAbstract("Campo requerido");
      return false;
    } else {
      setErrorAbstract(null);
      return true;
    }
  };

  const EliminarErroresRedux=()=>{
    setTimeout(() => {
      dispatch(removeError());
    }, 2000);
  }

  const handleChangeUseForm = (event) => {
    const InputChange = {
      ...useForm,
      [event.target.name]: event.target.value,
    };
    setuseForm(InputChange);
  };

  const handleSubmitForm = () => {
    const path = pathRef.current.value;
    const abstract = abstractRef.current.value;
    const token = tokens["access-token"];
    if (ValidatorisAbstract() & ValidatorisPath()) {
      dispatch(
        SendDataFormCreateBookmark(
          TipoRecuros,
          IDCapitulo,
          path,
          abstract,
          token
        )
      );
    }
  };

  return (
    <Container maxWidth="sm" className={clases.ContainerPrincipal}>
      <Grid align="center" container>
        <Grid item xs={12} className={clases.GridTitle}>
          <Typography variant="h4">Editar Marcador</Typography>
        </Grid>

        <Grid align="left" item xs={12} className={clases.GridForm}>
          <FormControl variant="outlined" className={clases.select}>
            <label>
              <Typography
                align="left"
                className={clases.type_color}
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
              {!TipoRecuros && (
                <MenuItem value="" disabled>
                  <div className={clases.select_placeholder}>Seleccione</div>
                </MenuItem>
              )}
              <MenuItem value="chapter">Capitulo</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={clases.select}>
            <label>
              <Typography
                align="left"
                className={clases.type_color}
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
              {!IDCapitulo && (
                <MenuItem value="" disabled>
                  <div className={clases.select_placeholder}>Seleccione</div>
                </MenuItem>
              )}
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
            <label className={clases.type_color}>Path *</label>
            <TextField
              style={{ borderRadius: "30px" }}
              variant="outlined"
              margin="normal"
              placeholder="Ej.:12;56"
              name="path"
              inputRef={pathRef}
              onBlur={ValidatorisPath}
              onInput={ValidatorisPath}
              InputProps={{
                className: clases.input,
              }}
            />
            {ErrorPath && (
              <Grid style={{ marginTop: "5px", marginBlockEnd: "5px" }}>
                <Typography className={clases.MsgError}>{ErrorPath}</Typography>
              </Grid>
            )}
          </FormControl>

          <FormControl variant="outlined" className={clases.select}>
            <label>
              <Typography
                align="left"
                className={clases.type_color}
                variant="h6"
              >
                Abstracto del Capitulo *
              </Typography>
            </label>
            <TextField
              id="outlined-multiline-static"
              style={{ borderRadius: "30px" }}
              multiline
              rows={6}
              variant="outlined"
              inputRef={abstractRef}
              onBlur={ValidatorisAbstract}
              onInput={ValidatorisAbstract}
            />
            {ErrorAbstract && (
              <Grid style={{ marginTop: "5px", marginBlockEnd: "5px" }}>
                <Typography className={clases.MsgError}>
                  {ErrorAbstract}
                </Typography>
              </Grid>
            )}
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
              onClick={handleSubmitForm}
            >
              Ingresar
            </Button>
            <Backdrop className={clases.backdrop} open={loading}>
              <CircularProgress size={100} color="inherit" />
            </Backdrop>
            {id &&(
             <Redirect to="/List" />

            )}
          </Box>
          {msgError &&(

              <Alert severity="error">
                <AlertTitle>{msgError}</AlertTitle>
              </Alert>
          )}

          {msgError ? EliminarErroresRedux() : ""}
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateBookmark;
