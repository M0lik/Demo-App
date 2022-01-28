import axios from "axios";
import {BASE_URL} from './config';

export const authApi = {
  login: async (username, password) => {
    try {
      const res = await axios.post(BASE_URL + "auth/login", {
        username,
        password,
      });
      return res.data.access_token;
    } catch (err) {
      console.log("error : ", err);
      return { error: "something went wrong!" };
    }
  },
  getUser: async (access_token) => {
    const config = {
      headers: { Authorization: `Bearer ${access_token}` },
    };

    try {
      const res = await axios.get(BASE_URL + "auth/profile", config);
      return res.data;
    } catch (err) {
      console.log("error : ", err);
      return { error: "something went wrong!" };
    }
  },
};
