import React, { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AbstractStep from "./AbstractStep";
import {availabilityApi} from '../../api/availability';

export default function StepTwo(props) {
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
        let room = rooms.find(e => e._id === selectedRoom);
        props.onValidation(room);
        props.handleNext();
      }}
    >
       <div style={{ display: "flex" }}>
        <h4 style={{ margin: "auto" }}>Choose an available Room</h4>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{margin:'auto'}}>
        <Select
          labelId="room"
          id="room"
          label="Room"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          {rooms.map((e) => (
            <MenuItem value={e._id}>{e.name}</MenuItem>
          ))}
        </Select>
      </div>
      </div>
    </AbstractStep>
  );
}
