import { makeStyles } from "@material-ui/core/styles";
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

}));
