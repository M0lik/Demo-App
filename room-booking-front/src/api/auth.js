import axios from "axios";
import { BASE_URL } from "../config/constant";

const authApiUrl = `${BASE_URL}auth/`;

export const authApi = {
  login: async (username, password) => {
    try {
      const res = await axios.post(`${authApiUrl}login`, {
        username,
        password,
      });
      return res.data.access_token;
    } catch (err) {
      console.log("error : ", err);
      return null;
    }
  },
  getUser: async (access_token) => {
    const config = {
      headers: { Authorization: `Bearer ${access_token}` },
    };

    try {
      const res = await axios.get(`${authApiUrl}profile`, config);
      return res.data;
    } catch (err) {
      console.log("error : ", err);
      return null;
    }
  },
};
