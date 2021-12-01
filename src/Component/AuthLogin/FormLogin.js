import { useEffect, useRef, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useStyle } from "./FormStyle";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Alert, AlertTitle } from "@material-ui/lab";
import validator from "validator/es";
import { useDispatch, useSelector } from "react-redux";
import { AuthRequestLogin } from "../../Redux/Action/ActionAuth";
import { Redirect } from "react-router-dom";
import { RemoveRequestDataForm } from "../../Redux/Action/ActionFormBookmark";
import { removeError } from "../../Redux/Action/ActionError";

const RegetEmail = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const InitialValueForm = {
  email: "",
  password: "",
};
function FormLogin(props) {
  const clases = useStyle();
  const captcha = useRef(null);
  const [UseForm, setUseForm] = useState(InitialValueForm);
  const { email, password } = UseForm;
  const [Checked, setChecked] = useState(false);
  const [ErrorEmail, setErrorEmail] = useState(null);
  const [ErrorPassword, setErrorPassword] = useState(null);
  const [ErrorTerms, setErrorTerms] = useState(null);
  const [ErrorCaptcha, setErrorCaptcha] = useState(null);
  const dispatch = useDispatch();
  const { tokens, AuthUser } = useSelector((state) => state.UserLogin);
  const { loading, msgError } = useSelector((state) => state.UIError);

  const HandleValueForm = (event) => {
    const InputChange = {
      ...UseForm,
      [event.target.name]: event.target.value,
    };
    setUseForm(InputChange);
  };

  const HandleChecked = (event) => {
    setChecked(event.target.checked);
    if (!Checked) {
      setErrorTerms(null);
    } else {
      setErrorTerms("Debe aceptar los Terminos y Condiciones ");
    }
  };

  const isValidatorEmail = () => {
    if (validator.isEmpty(email)) {
      setErrorEmail("Campo requerido");
      return false;
    } else {
      /* if(!RegetEmail.test(email) ){
            setErrorEmail("Formato incorrecto ");
            return false;
        }*/
      setErrorEmail(null);
      return true;
    }
  };

  const isValidatorPassword = () => {
    if (validator.isEmpty(password)) {
      setErrorPassword("Campo requerido");
      return false;
    } else {
      setErrorPassword(null);
      return true;
    }
  };

  const EliminarErroresRedux = () => {
    setTimeout(() => {
      dispatch(removeError());
    }, 2000);
  };

  const isValidatorTermin = () => {
    if (!Checked) {
      setErrorTerms("Debe aceptar los Terminos y Condiciones ");
      return false;
    } else {
      setErrorTerms(null);
      return true;
    }
  };

  const isValidatorCaptcha = () => {
    if (!captcha.current.getValue()) {
      setErrorCaptcha("Debe Validar que no es un robot");
      return false;
    } else {
      setErrorCaptcha(null);
      return true;
    }
  };
// Funcion para llamar al servicio de Login de la Api
  const HandleSubmitLogin = () => {
    if (
      isValidatorEmail() &
      isValidatorPassword() &
      isValidatorTermin() &
      isValidatorCaptcha()
    ) {
      dispatch(AuthRequestLogin(email, password));
    }
  };

  return (
    <Container maxWidth="sm" className={clases.ContainerPrincipal}>
      <Grid align="center" container>
        <Grid item xs={12} className={clases.GridTitle}>
          <Typography variant="h4">Acceda al Sistema</Typography>
        </Grid>

        <Grid align="left" item xs={12} className={clases.GridForm}>
          <FormControl variant="outlined" fullWidth>
            <label style={{ marginBlockEnd: "-12px" }}>
              Correo Electronico*
            </label>
            <TextField
              style={{ borderRadius: "30px" }}
              variant="outlined"
              margin="normal"
              placeholder="example@gmail.com"
              name="email"
              value={email}
              onChange={HandleValueForm}
              onBlur={isValidatorEmail}
              onInput={isValidatorEmail}
              InputProps={{
                className: clases.input,
              }}
            />

            {ErrorEmail && (
              <Grid style={{ marginTop: "5px", marginBlockEnd: "5px" }}>
                <Typography className={clases.MsgError}>
                  {ErrorEmail}
                </Typography>
              </Grid>
            )}

            <label style={{ marginBlockEnd: "-12px" }}>Contraseña*</label>
            <TextField
              variant="outlined"
              margin="normal"
              type="password"
              placeholder="Ingrese su contraseña"
              name="password"
              value={password}
              onChange={HandleValueForm}
              onBlur={isValidatorPassword}
              InputProps={{
                className: clases.input,
              }}
            />

            {ErrorPassword && (
              <Grid style={{ marginTop: "5px", marginBlockEnd: "5px" }}>
                <Typography className={clases.MsgError}>
                  {ErrorPassword}
                </Typography>
              </Grid>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  onChange={HandleChecked}
                  name="Checked"
                  color="primary"
                />
              }
              label="Aceptar los terminos y condiciones"
            />

            {ErrorTerms && (
              <Grid style={{ marginTop: "5px", marginBlockEnd: "5px" }}>
                <Typography className={clases.MsgError}>
                  {ErrorTerms}
                </Typography>
              </Grid>
            )}

            <Box
              className={clases.Recaptcha}
              display={"flex"}
              flexDirection={"column"}
            >
              <ReCAPTCHA
                ref={captcha}
                sitekey="6Lcq8X0cAAAAAGLIOcWz2lgXvlY8kKGsiGxRECOz"
                hl="es"
                onChange={isValidatorCaptcha}
              />
            </Box>

            {ErrorCaptcha && (
              <Grid style={{ marginTop: "5px", marginBlockEnd: "5px" }}>
                <Typography className={clases.MsgError}>
                  {ErrorCaptcha}
                </Typography>
              </Grid>
            )}

            {msgError && (
              <Grid style={{ marginTop: "5px", marginBlockEnd: "5px" }}>
                <Alert severity="info">
                  <AlertTitle>{msgError}</AlertTitle>
                </Alert>
              </Grid>
            )}
            {msgError ? EliminarErroresRedux() : ""}
            {AuthUser && <Redirect to={"/"} />}

            <Button
              className={clases.ButtonIngresar}
              variant="contained"
              color="primary"
              onClick={HandleSubmitLogin}
            >
              Ingresar
            </Button>

            <Backdrop className={clases.backdrop} open={loading}>
              <CircularProgress size={100} color="inherit" />
            </Backdrop>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
}

export default FormLogin;
