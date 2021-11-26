import axios from "axios";
const base_Url = process.env.REACT_APP_API_URL;

async function ListDataBookmarks(token) {
  try {
    return await axios.get(base_Url + "/bookmarks", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw error;
  }
}

async function SendDDataNewBookmark(
  TipoRecuros,
  IDCapitulo,
  path,
  abstract,
  token
) {
  try {
    return await axios.post(
      base_Url + "/bookmarks",
      {
        "resource-id": IDCapitulo,
        "resource-type": TipoRecuros,
        path: path,
        abstract: abstract,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    throw error;
  }
}

export { ListDataBookmarks, SendDDataNewBookmark };
