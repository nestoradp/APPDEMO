import { finishLoading, setError, startLoading } from "./ActionError";
import { SendDDataNewBookmark } from "../../Axios/BookmarksAPI";
import { TYPES } from "../types/type";

export const SendDataFormCreateBookmark = (
  TipoRecuros,
  IDCapitulo,
  path,
  abstract,
  token
) => {
  return (dispatch) => {
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
        dispatch(setError(message));
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


export  const RemoveRequestDataForm =()=>({
  type : TYPES.RemoveRequestCreate
})
