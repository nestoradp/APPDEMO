import { useState } from "react";
import {
  AppBar,
  Avatar,
  Button,
  Grid,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useStyle } from "./MenuBarStyle";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import {AuthCloseSesion} from "../../Redux/Action/ActionAuth";
import SvgIcon from "@material-ui/core/SvgIcon";
import { makeStyles } from "@material-ui/core/styles";
import ListIcon from "@material-ui/icons/List";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {AuthCloseSesion} from "../../Redux/Action/ActionAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > svg": {
      margin: theme.spacing(2),
    },
  },
}));

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function MenuBar() {
  const { token, AuthUser } = useSelector((state) => state.UserLogin);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const clases = useStyle();

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const  handleCloseSesion=()=>{
    dispatch(AuthCloseSesion());
  }

  return (
    <AppBar className={clases.appBar}>
      <Toolbar className={clases.Toolbar1} variant="dense">
        <Grid item xs={6}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Link to={"/"}>
              <HomeIcon style={{ color: "white" }} />
            </Link>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start"
        >
          {!AuthUser && (
            <Link to={"/sigIn"}>
              <Button
                variant="text"
                size="small"
                style={{ marginRight: "20px", color: "white" }}
              >
                Iniciar Sesion
              </Button>
            </Link>
          )}

          {AuthUser && (
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-start"
            >
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClickMenu}
              >
                <Avatar alt={AuthUser.first_name} src="/broken-image.jpg" />
              </Button>
              <Typography variant={"h6"} className={clases.nameUser}>
                {" "}
                {AuthUser.username}
              </Typography>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem >Mi Perfil</MenuItem>
                <MenuItem >Configuracion</MenuItem>
                <MenuItem onClick={handleCloseSesion}>Cerrar Sesion</MenuItem>
              </Menu>
            </Grid>
          )}
        </Grid>
      </Toolbar>

      <Toolbar className={clases.Toolbar2}>
        <AddCircleOutlineIcon />
        <Link to={"/create"}>
          <Typography style={{ marginRight: "10px" }}>Crear</Typography>
        </Link>

        <ListIcon />
        <Link to={"/List"}>
          <Typography>Listar</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default MenuBar;
