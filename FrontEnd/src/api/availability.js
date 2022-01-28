import axios from "axios";
import {BASE_URL} from './config';

export const availabilityApi = {
  getRooms: async (startDate, endDate) => {
    try {
      const res = await axios.post(BASE_URL + "room/findAvailableRooms", {
        startDate,
        endDate,
      });
      return res.data;
    } catch (err) {
      console.log("error : ", err);
      return [];
    }
  },
  getSlots: async (startDate, endDate, companyId) => {
    try {
      const res = await axios.post(BASE_URL + "slot/findAvailableSlots", {
        startDate,
        endDate,
        companyId
      });
      return res.data;
    } catch (err) {
      console.log("error : ", err);
      return [];
    }
  },
};
