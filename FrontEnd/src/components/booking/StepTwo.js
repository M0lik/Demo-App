import React, { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import AbstractStep from "./AbstractStep";
import {availabilityApi} from '../../api/availability';

export default function StepTwo(props) {

console.log('props : ', props)
  const [rooms, setRooms] = React.useState([]);
  const [selectedRoom, setSelectedRoom] = React.useState(null);

  useEffect(() => {
    const asyncCall = async () => {
    console.log(props.startDate);
    console.log(props.endDate);
    let tmpRooms = await availabilityApi.getRooms(props.startDate, props.endDate);
    setRooms(tmpRooms);
    setSelectedRoom(tmpRooms[0]._id)
    };

    asyncCall();
  }, []);

  return (
    <AbstractStep
      {...props}
      handleNext={() => {
        props.onValidation(selectedRoom);
        props.handleNext();
      }}
    >
      <div>
        <h6>Choose an available Room</h6>
        <InputLabel id="room">Room</InputLabel>
        <Select
          labelId="room"
          id="room"
          label="Room"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          {rooms.map((e, idx) => (
            <MenuItem value={e._id}>{e.name}</MenuItem>
          ))}
        </Select>
      </div>
    </AbstractStep>
  );
}
