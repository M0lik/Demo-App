import React from "react";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import NavBar from "../../../components/NavBar";
import { userSelector } from "../../../redux/auth/userSlice";
import StepOne from "../../../components/booking/StepOne";
import StepTwo from "../../../components/booking/StepTwo";
import StepThree from "../../../components/booking/StepThree";
import { bookingApi } from "../../../api/booking";
import { useHistory } from "react-router";

export default function NewBooking() {
  const user = useSelector(userSelector);
  const history = useHistory();

  const steps = ["Select time", "Select Room", "Select Slot", "Confirmation"];

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [selectedRoom, setSelectedRoom] = React.useState(null);
  const [selectedSlot, setSelectedSlot] = React.useState(null);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const validation = async () => {
    const res = await bookingApi.createBooking(
      new Date(startDate),
      new Date(endDate),
      selectedRoom,
      selectedSlot,
      user.userId
    );
    history.push("/");
  };

  console.log("newbooking display ");
  return (
    <div className="background">
      <NavBar title={"Week Bookings"} />
      <Paper
        className="center flex_column small_padding"
        style={{
          width: "90%",
          height: "60%",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === 0 ? (
            <StepOne
              activeStep={activeStep}
              handleBack={handleBack}
              handleNext={handleNext}
              onValidation={(start, end) => {
                setStartDate(start);
                setEndDate(end);
              }}
              steps={steps}
            />
          ) : null}
          {activeStep === 1 ? (
            <StepTwo
              startDate={startDate}
              endDate={endDate}
              activeStep={activeStep}
              handleBack={handleBack}
              handleNext={handleNext}
              onValidation={(room) => {
                setSelectedRoom(room);
              }}
              steps={steps}
            />
          ) : null}
          {activeStep === 2 ? (
            <StepThree
              startDate={startDate}
              endDate={endDate}
              activeStep={activeStep}
              handleBack={handleBack}
              handleNext={handleNext}
              onValidation={(slot) => {
                setSelectedSlot(slot);
              }}
              steps={steps}
            />
          ) : null}
          {activeStep === 3 ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                {/* <Button onClick={handleReset}>Reset</Button> */}
                <Button onClick={validation}>Validation</Button>
              </Box>
            </React.Fragment>
          ) : null}
        </Box>
      </Paper>
    </div>
  );
}
