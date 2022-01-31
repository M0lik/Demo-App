import React from "react";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import NavBar from "../../../components/NavBar";
import { userSelector } from "../../../redux/auth/userSlice";
import { bookingApi } from "../../../api/booking";
import { useHistory } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DeleteBooking() {
  const user = useSelector(userSelector);
  const history = useHistory();
  const [myBookings, setMyBookings] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const deleteBooking = async (id) => {
    await bookingApi.deleteBookings(id);
  };

  const clearData = (dataArray) =>
    dataArray.map((bookingData) => {
      return {
        title: bookingData.slot.company.name + " " + bookingData.slot.name,
        start: bookingData.start,
        end: bookingData.end,
        id: bookingData._id,
      };
    });

  React.useEffect(() => {
    const asyncCall = async () => {
      const bookings = await bookingApi.getUserBookings(user.userId);
      setMyBookings(clearData(bookings));
    };

    asyncCall();
  }, []);

  return (
    <div className="background">
      <NavBar  />
      <Paper
        className="center flex_column small_padding"
        style={{
          width: "90%",
          height: "80%",
        }}
      >
         <div style={{display:'flex', flexDirection:'column'}}>
          <h1 style={{margin:'auto'}}>Delete Bookings</h1>
          <h4 style={{margin:'auto'}}>Click on the booking you want to delete.</h4>
        </div>
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          weekends={false}
          slotMinTime={"08:00:00"}
          slotMaxTime={"19:00:00"}
          height={"620px"}
          allDaySlot={false}
          eventSources={[
            {
              events: myBookings,
              color: "#d3d3d3",
              textColor: "black",
            },
          ]}
          eventClick={(info) => {
            handleOpen();
            setSelectedEvent(info.event);
          }}
        />
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {selectedEvent !== null ? (
          <Box sx={style}>
            <h2>DELETE</h2>
            <h4>Are you sure you want to delete {selectedEvent.title} ?</h4>
            <p>
              Slot from{" "}
              {moment(selectedEvent.start).format("DD/MM/YYYY HH:mm ")}
              to {moment(selectedEvent.end).format("DD/MM/YYYY HH:mm")}{" "}
            </p>
            <div className="flex_row">
              <Button
                variant="contained"
                color="error"
                onClick={async () => {
                  await deleteBooking(selectedEvent.id);
                  window.location.reload(true);
                }}
              >
                Confirm
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                {" "}
                Cancel
              </Button>
            </div>
          </Box>
        ) : (
          <div></div>
        )}
      </Modal>
    </div>
  );
}
