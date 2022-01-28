import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function AbstractStep({ children, activeStep, handleBack, handleNext, steps })  {
    console.log(children);
    return (
      <>
        {children}
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </>
    );
  };
  