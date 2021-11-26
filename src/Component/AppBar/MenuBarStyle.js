import { makeStyles } from "@material-ui/core/styles";
export const useStyle = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },

  Toolbar1: {
    backgroundColor: "#561571",
  },

  Toolbar2: {
    backgroundColor: "white",
    justifyContent: "flex-start",
    borderBlock: "1px solid #e0e0e0",
    minHeight: "10vh",
    color: "black",
  },

  nameUser: {
    marginLeft: "-5px",
    marginBlockStart: "10px",
    fontWeight: "bold",
  },
}));
