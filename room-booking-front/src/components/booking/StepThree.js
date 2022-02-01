import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AbstractStep from "./AbstractStep";
import { userSelector } from "../../redux/auth/userSlice";
import { useSelector } from "react-redux";
import { availabilityApi } from "../../api/availability";

export default function StepThree(props) {
  const [slots, setSlots] = React.useState(["S1", "S2", "S3"]);
  const [selectedSlot, setSelectedSlot] = React.useState(null);

  const user = useSelector(userSelector);

  React.useEffect(() => {
    const asyncCall = async () => {
      let tmpSlots = await availabilityApi.getSlots(
        props.startDate,
        props.endDate,
        user.companyId
      );
      console.log(tmpSlots);
      setSlots(tmpSlots);
      setSelectedSlot(tmpSlots[0]._id);
    };

    asyncCall();
  }, []);

  return (
    <AbstractStep
      {...props}
      handleNext={() => {
        const slot = slots.find(e => e._id === selectedSlot);
        props.onValidation(slot);
        props.handleNext();
      }}
    >
       <div style={{ display: "flex" }}>
        <h4 style={{ margin: "auto" }}>Assign slot</h4>
      </div>
      <div style={{display:'flex'}}>
        <Select
        style={{margin:'auto'}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSlot}
          label="Age"
          onChange={(e) => setSelectedSlot(e.target.value)}
        >
          {slots.map((e) => (
            <MenuItem value={e._id}>{e.name}</MenuItem>
          ))}
        </Select>
      </div>
    </AbstractStep>
  );
}
