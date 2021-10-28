import React, { useState, useEffect } from 'react';
import { Box, Container, Stepper, Step, StepLabel, Button, Typography, Card } from '@mui/material'
import { useFetch } from '../hooks/useFetch';
import { getCart, getUser } from '../api/api';
import AddressForm from './AddressForm'
import Review from './Review'
import PaymentForm from './PaymentForm'

const steps = ['Leveransadress', 'Betalning', 'Beställning'];


export const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState();

  useEffect(() => {
    getUser('61794a3f8cc6b27251f823e3').then(res => setData(res.data)).catch(err => console.log(err));
  }, [])

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          data && <AddressForm data={data} />
        )
      case 1:
        return (
          data && <PaymentForm data={data} />
        )
      case 2:
        return (
          data && <Review data={data} />
        )
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <Container sx={{ mb: 4, width: '50%' }}>
        <Card variant="outlined" sx={{ p: { md: 3 } }}>
          <Typography component="h1" variant='h4' align="center">
            Kassa
          </Typography>
          <Stepper activeStep={activeStep} sx={{ p: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Tack för din order!
                </Typography>
                <Typography variant="subtitle1">
                  Ditt ordernummer är: (insertordernumber).
                  Vi har mailat dig en bekräftelse och uppdaterar dig så fort ordern är skickad.
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </>
            )}
          </>
        </Card>
      </Container>
    </>
  );
}

export default CheckoutPage;