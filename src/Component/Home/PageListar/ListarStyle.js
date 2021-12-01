import {lighten, makeStyles} from "@material-ui/core/styles";
export const useStyle = makeStyles((theme) => ({
  ContainerPrincipal: {},

  GridTitle: {
    paddingTop: "10px",
  },

  GridForm: {
    paddingTop: "40px",
  },

  send_support: {
    position: "fixed",
    width: "70%",
    maxWidth: "500px",
    top: "10px",
    left: "15%",
    "@media screen and (min-width: 714px)": {
      left: "calc(50% - 250px)",
    },
    zIndex: "2000",
  },

  ButtonEliminar: {
    marginTop: "10px",
    backgroundColor: "#ab003c",
    color: "white",
  },


//Style del DataTable

  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
      theme.palette.type === "light"
          ? {
            color: theme.palette.primary.light,
            backgroundColor: lighten(theme.palette.error.dark, 0.85),
          }
          : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.success.dark,
          },
  title: {
    flex: "1 1 100%",
  },



  rootPrincipal: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },


 // Modal
  content: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: "0.5rem",
    border: "2px solid #00205b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: "400px",
    maxWidth: "400px",
    "@media screen and (max-width: 500px)": {
      width: "auto",
    },
    "@media screen and (max-width: 455px)": {
      margin: "1rem 1rem",
    },
  },

  positionCard: {
    minHeight: "240px",
    position: "sticky",
    top: "calc(50% - 200px)",
    left: "calc(50% - 300px)",
  },

  select: {
    width: "100%",
    margin: "1rem 0",
    color: '#00205b',
  },

  type_color: {
    color: "#00205b",
    fontSize: "16px",
    fontWeight: "bold",
  },

  MsgError: {
    marginTop: "-10px",
    marginLeft: "20px",
    color: theme.palette.error.dark,
    fontWeight: "bold",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#FFF",

  },
  input: {
    borderRadius: "20px",
    // backgroundColor: "#ab003c",
  },


  edit_modal: {
    backgroundColor: "rgba(0,0,0,0)",
    display: "flex",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "scroll",
  },

  icons:{
    cursor:"pointer"
  },
}));
