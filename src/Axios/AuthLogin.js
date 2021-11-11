import axios from "axios";

const base_Url = process.env.REACT_APP_API_URL


async function SendDataLogin(username, password) {
    try {
        return await axios.post(base_Url + "/logins", {
            "username-or-email": username,
            password: password

        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        throw error;

    }

}






export{
    SendDataLogin
}
