import {
  finishLoading,
  removeError,
  setError,
  startLoading,
} from "./ActionError";
import { SendDDataNewBookmark } from "../../Axios/BookmarksAPI";
import { TYPES } from "../types/type";
import { AuthCloseSesion } from "./ActionAuth";

export const SendDataFormCreateBookmark = (
  TipoRecuros,
  IDCapitulo,
  path,
  abstract,
  token
) => {
  return (dispatch) => {
    dispatch(removeError());
    dispatch(startLoading());
    SendDDataNewBookmark(TipoRecuros, IDCapitulo, path, abstract, token)
      .then((data) => {
        dispatch(finishLoading());
        const id = data.data.id;
        const StatusCode = data.status;
        dispatch(SalveRequestDataForm(id, StatusCode));
      })
      .catch((error) => {
        dispatch(finishLoading());
        const { message } = JSON.parse(error.request.response);
        const status = error.request.status;
        if (status === 403) {
          dispatch(AuthCloseSesion());
        }
        dispatch(setError(message, status));
      });
  };
};

const SalveRequestDataForm = (id, StatusCode) => ({
  type: TYPES.SalveRequestCreate,
  payload: {
    id,
    StatusCode,
  },
});

export const RemoveRequestDataForm = () => ({
  type: TYPES.RemoveRequestCreate,
});
