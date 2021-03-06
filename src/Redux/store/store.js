import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { AuthReducerLogin } from "../reducer/AuthReducer";
import { UIReducer } from "../reducer/ErrorReducer";
import { BookmarksReducer } from "../reducer/BookmarksReducer";
import { RequestDataReducer } from "../reducer/RequestDataReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducer = combineReducers({
  UserLogin: AuthReducerLogin,
  Requestdata: RequestDataReducer,
  List: BookmarksReducer,
  UIError: UIReducer,
});

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
