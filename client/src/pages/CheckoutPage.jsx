import React, { useState, useContext } from 'react';
import { Box, Container, Stepper, Step, StepLabel, Button, Typography, Card } from '@mui/material'
import { UiContext } from '../context/uiContext';
import { useFetch } from '../hooks/useFetch';
import { addOrder, getCart, getLoggedInUser, emptyCart } from '../api/api';
import AddressForm from '../components/Form/CheckoutAddressForm'
import Review from '../components/Form/ReviewForm'
import PaymentForm from '../components/Form/PaymentForm'

export const CheckoutPage = () => {

  const [payment, setPayment] = useState({ cardName: "", cardNumber: "", expDate: "", cvv: "" });
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState();
  const { setNotification } = useContext(UiContext);
  const steps = ['Leveransadress', 'Betalning', 'Beställning'];

  const { data: cart } = useFetch(getCart)
  const { data: user, setData: setUser } = useFetch(getLoggedInUser)

  const placeOrder = async () => {

    const orderRows = cart.cart.map(item => (
      {
        productTitle: item.product.title,
        amount: item.amount,
        priceEach: item.product.price
      })
    )

    const data = {
      orderRows,
      address: user.address
    }

    try {

      const order = await addOrder(data);

      if (order) {
        emptyCart();
        setOrderNumber(order.data._id)
        handleNext();
      }
    } catch (error) {
      setNotification({
        type: 'warning',
        message: 'Kunde inte bekräfta beställning',
      });
      console.log(error)
    }
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          user && <AddressForm user={user} setUser={setUser} />
        )
      case 1:
        return (
          user && <PaymentForm payment={payment} setPayment={setPayment} />
        )
      case 2:
        return (
          user && cart && <Review cart={cart} user={user} payment={payment} />
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
      <Container sx={{ mb: 4, width: '65%' }}>
        <Card variant="outlined" sx={{ p: { md: 3 } }}>
          <Typography component="h1" variant='h4' align="center">
            Kassa
          </Typography>
          <Stepper activeStep={activeStep} sx={{ p: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length
              ?
              (
                <>
                  <Typography variant="h5" gutterBottom>
                    {`Tack för din order ${user.fullName}!`}
                  </Typography>
                  {orderNumber && <Typography variant="subtitle1">
                    Ditt ordernummer är: {orderNumber}.
                    Vi har mailat en orderbekräftelse och hör av oss till dig så fort ordern är skickad.
                  </Typography>
                  }
                </>
              )
              :
              (
                <Box sx={{ height: 'relative' }}>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Gå bakåt
                      </Button>
                    )}
                    {activeStep === steps.length - 1
                      ?
                      (
                        <Button
                          variant="contained"
                          onClick={placeOrder}
                          sx={{ mt: 3, ml: 1 }}
                        > Bekräfta beställning</Button>
                      )
                      :
                      (
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 3, ml: 1 }}
                        >
                          Nästa
                        </Button>
                      )}
                  </Box>
                </Box>
              )}
          </>
        </Card>
      </Container>
    </>
  );
}

export default CheckoutPage;