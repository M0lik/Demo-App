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
      console.log(props.startDate);
      console.log(typeof props.startDate);
      console.log(props.endDate);
      console.log(typeof props.endDate);
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
        props.onValidation(selectedSlot);
        props.handleNext();
      }}
    >
      <div>
        <h6>Assign slot</h6>
        <Select
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
