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

    input: {
        borderRadius: "20px",
        // backgroundColor: "#ab003c",
    },

    select: {
        width: "100%",
        margin: "0.8rem 0",
    },


    type_color: {
        color: "#00205b",
        fontSize: "16px",
        fontWeight: "bold",
    },

    select_placeholder: {
        color: "#00205b",
    },

    buttons_content: {
        "@media screen and (max-width: 470px)": {
            flexDirection: "column",
        },
    },

    MsgError: {
        marginTop: "-10px",
        marginLeft:"20px",
        color: theme.palette.error.dark,
        fontWeight: "bold",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#FFF",
    },
}));