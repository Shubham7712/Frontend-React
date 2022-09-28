/*eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Container } from 'reactstrap';
// import Header from '../Header'
// import Footer from '../Footer'

const steps = [
  'Order placed',
  'Order Confirrmed',
  'Preparing Order',
  'On the way', 
  'Order Delivered'
];

export default function HorizontalLabelPositionBelowStepper() {
  return (
<>

    <Container>
        <Box sx={{ width: '70%' , margin:"auto" }} className="mt-4">
          <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
    </Container>


</>

  );
}
