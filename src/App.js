import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { custom_theme } from "./theme";
import {CssBaseline} from "@material-ui/core";
import {Provider} from "react-redux";
import {store} from "./Redux/store/store";
import FormLogin from "./Component/AuthLogin/FormLogin";
import Layaout from "./Component/layaout/Layaout";
import AppRoute from "./Route/APPRoute";

const useGlobalStyles = makeStyles({
    "@global": {
        body: {
            with: "100%",
            margin:"0px",
            backgroundSize: "cover",
        },
    },
});


function MyThemeProvider({ children }) {
    useGlobalStyles();
    return <ThemeProvider theme={custom_theme}>{children}</ThemeProvider>;
}



function App() {
  return (
     <MyThemeProvider>
         <CssBaseline>
          <Provider store={store}>
         <AppRoute/>
          </Provider>
         </CssBaseline>

     </MyThemeProvider>



  );
}

export default App;
