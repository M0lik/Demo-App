import axios from "axios";
import { BASE_URL } from "./config";

export const bookingApi = {
  createBooking: async (startDate, endDate, roomId, slotId, userId) => {
    try {
      const res = await axios.post(BASE_URL + "booking", {
        user: userId,
        slot: slotId,
        room: roomId,
        start: startDate,
        end: endDate,
      });
      return res.data;
    } catch (err) {
      console.log("error : ", err);
      return [];
    }
  },
  getAllBookings: async () => {
    try {
      const res = await axios.get(BASE_URL + "booking");
      return res.data;
    } catch (err) {
      console.log("error : ", err);
      return [];
    }
  },
  getUserBookings: async (userId) => {
    try {
      const res = await axios.get(
        BASE_URL + "booking/findUserBookings/" + userId
      );
      return res.data;
    } catch (err) {
      console.log("error : ", err);
      return [];
    }
  },
  deleteBookings: async (id) => {
    try {
      const res = await axios.delete(
        BASE_URL + "booking/"+ id
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log("error : ", err);
      return [];
    }
  },
};
