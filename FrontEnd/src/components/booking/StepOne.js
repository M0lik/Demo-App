import React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AbstractStep from "./AbstractStep";

export default function StepOne(props) {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  return (
    <AbstractStep
      {...props}
      handleNext={() => {
        props.onValidation(startDate, endDate);
        props.handleNext();
      }}
    >
      <div style={{ display: "flex" }}>
        <h4 style={{ margin: "auto" }}>Select date for booking</h4>
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div style={{display:'flex', justifyContent:'space-evenly'}}>
          <div>
            <h4>Start Date : </h4>
            <DateTimePicker
              label="Date&Time picker"
              value={startDate}
              onChange={(e) => setStartDate(e)}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div>
            <h4>End Date : </h4>
            <DateTimePicker
              label="Date&Time picker"
              value={endDate}
              onChange={(e) => setEndDate(e)}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div>
      </LocalizationProvider>
    </AbstractStep>
  );
}
