import axios from "axios";
import { BASE_URL } from "../config/constant";

const bookingApiUrl = `${BASE_URL}booking/`;

export const bookingApi = {
  createBooking: async (startDate, endDate, roomId, slotId, userId) => {
    try {
      const res = await axios.post(bookingApiUrl, {
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
      const res = await axios.get(bookingApiUrl);
      return res.data;
    } catch (err) {
      console.log("error : ", err);
      return [];
    }
  },
  getUserBookings: async (userId) => {
    try {
      const res = await axios.get(`${bookingApiUrl}findUserBookings/${userId}`);
      return res.data;
    } catch (err) {
      console.log("error : ", err);
      return [];
    }
  },
  deleteBookings: async (id) => {
    try {
      const res = await axios.delete(`${bookingApiUrl}${id}`);
      return res.data;
    } catch (err) {
      console.log("error : ", err);
      return [];
    }
  },
};
