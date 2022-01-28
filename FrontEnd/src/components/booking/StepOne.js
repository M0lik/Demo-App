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
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <h6>Start Date : </h6>
          <DateTimePicker
            label="Date&Time picker"
            value={startDate}
            onChange={(e) => setStartDate(e)}
            renderInput={(params) => <TextField {...params} />}
          />
          <h6>End Date : </h6>
          <DateTimePicker
            label="Date&Time picker"
            value={endDate}
            onChange={(e) => setEndDate(e)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </AbstractStep>
  );
}
