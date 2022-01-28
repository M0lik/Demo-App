import React from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import Paper from "@mui/material/Paper";
import NavBar from "../../components/NavBar";
import { logOutUser } from "../../redux/auth/userSlice";
import { bookingApi } from "../../api/booking";

export const Page = () => {
  const dispatch = useDispatch();
  const [unknownBookings, setUnknownBookings] = React.useState([]);
  const [pepsiBookings, setPepsiBookings] = React.useState([]);
  const [cokeBookings, setCokeBookings] = React.useState([]);

  const logout = () => {
    dispatch(logOutUser());
  };

  const clearData = (bookingData) => {
    return {
      title: bookingData.slot.company.name + " " + bookingData.slot.name,
      start: bookingData.start,
      end: bookingData.end
    };
  };

  React.useEffect(() => {
    const asyncCall = async () => {
      const tmpBookings = await bookingApi.getAllBookings();
      let tmpCokeBookings = [];
      let tmpPepsiBookings = [];
      let tmpUnknownBookings = [];

      tmpBookings.map((e) => {
        const clearedDate = clearData(e);
        if (e.slot.company.name === "COKE") tmpCokeBookings.push(clearedDate);
        else if (e.slot.company.name === "PEPSI")
          tmpPepsiBookings.push(clearedDate);
        else tmpUnknownBookings.push(clearedDate);
      });
      setPepsiBookings(tmpPepsiBookings);
      setCokeBookings(tmpCokeBookings);
      setUnknownBookings(tmpUnknownBookings);
    };
    asyncCall();
  }, []);

  return (
    <div className="background">
      <NavBar title={"Week Bookings"} />
      <Paper
        className="center flex_column"
        style={{
          width: "90%",
          height: "80%",
        }}
      >
        <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        expandRows={true}
        />
       {/* <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        weekends={false}
        slotMinTime={"08:00:00"}
        slotMaxTime={"19:00:00"}
         height={"700px"}
        allDaySlot={false}
        eventSources={[
          {
            events: pepsiBookings,
            color: "#004B93",
            textColor: "white",
          },
          {
            events: cokeBookings,
            color: "#F40009",
            textColor: "white",
          },
          {
            events: unknownBookings,
            color: "#d3d3d3",
            textColor: "black",
          },
        ]}

      /> */}

      </Paper>
    </div>
  );
};