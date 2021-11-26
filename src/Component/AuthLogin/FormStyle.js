import { makeStyles } from "@material-ui/core/styles";
export const useStyle = makeStyles((theme) => ({
  ContainerPrincipal: {
    paddingTop: "20px",
  },

  GridTitle: {
    paddingTop: "30px",
  },

  GridForm: {
    paddingTop: "40px",
  },

  ButtonIngresar: {
    marginTop: "10px",
    backgroundColor: "#ab003c",
    color: "white",
  },

  Recaptcha: {
    paddingTop: "20px",
    paddingBlockEnd: "20px",
  },

  LabelTitle: {
    marginBlockEnd: "-18px",
    marginBlockStart: "10px",
    //  textAlign:"center",
    fontWeight: "bold",
    fontFamily: theme.typography.fontFamily,
  },

  input: {
    borderRadius: "20px",
    // backgroundColor: "#ab003c",
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#FFF",
  },

  MsgError: {
    marginTop: "-10px",
    marginLeft: "20px",
    color: theme.palette.error.dark,
    fontWeight: "bold",
  },
}));
